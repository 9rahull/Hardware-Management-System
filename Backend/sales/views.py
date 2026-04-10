# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Sale
# from .serializers import SaleSerializer


# # ✅ CREATE SALE (stock reduces automatically via serializer)
# @api_view(['POST'])
# def create_sale(request):
#     print("📥 SALE DATA RECEIVED:", request.data)

#     serializer = SaleSerializer(data=request.data)

#     if serializer.is_valid():
#         serializer.save()
#         print("✅ SALE SAVED")
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#     print("❌ SALE ERROR:", serializer.errors)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # ✅ GET ALL SALES (for sales history)
# @api_view(['GET'])
# def get_sales(request):
#     sales = Sale.objects.all().order_by('-created_at')
#     serializer = SaleSerializer(sales, many=True)
#     return Response(serializer.data)


# # ✅ GET SINGLE SALE (for receipt)
# @api_view(['GET'])
# def get_single_sale(request, pk):
#     try:
#         sale = Sale.objects.get(id=pk)
#         serializer = SaleSerializer(sale)
#         return Response(serializer.data)
#     except Sale.DoesNotExist:
#         return Response({"error": "Sale not found"}, status=status.HTTP_404_NOT_FOUND)


# # ✅ SALES SUMMARY (for dashboard)
# @api_view(['GET'])
# def sales_summary(request):
#     sales = Sale.objects.all()

#     total_sales = sales.count()
#     total_revenue = sum(s.total_amount for s in sales)
#     cash_sales = sales.filter(payment_method='cash').count()
#     khalti_sales = sales.filter(payment_method='khalti').count()

#     return Response({
#         "total_sales": total_sales,
#         "total_revenue": total_revenue,
#         "cash_sales": cash_sales,
#         "khalti_sales": khalti_sales
#     })


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from .models import Sale, SaleItem
from .serializers import SaleSerializer
from analytics.models import Product


# ✅ CREATE SALE — saves SaleItems + deducts stock
@api_view(['POST'])
def create_sale(request):
    print("📥 SALE DATA RECEIVED:", request.data)

    items_data = request.data.get('items', [])
    payment_method = request.data.get('payment_method', 'cash')
    customer_name = request.data.get('customer_name', '')

    if not items_data:
        return Response({"error": "No items provided"}, status=status.HTTP_400_BAD_REQUEST)

    # --- Validate stock first before touching anything ---
    errors = []
    for item in items_data:
        try:
            product = Product.objects.get(id=item['product'])
            if product.stock < item['quantity']:
                errors.append(f"{product.name}: only {product.stock} units in stock")
        except Product.DoesNotExist:
            errors.append(f"Product ID {item['product']} not found")

    if errors:
        return Response({"error": errors}, status=status.HTTP_400_BAD_REQUEST)

    # --- Save everything atomically ---
    try:
        with transaction.atomic():
            # Calculate total
            total = 0
            product_objects = {}
            for item in items_data:
                product = Product.objects.select_for_update().get(id=item['product'])
                product_objects[item['product']] = product
                total += product.price * item['quantity']

            # Create Sale
            sale = Sale.objects.create(
                customer_name=customer_name,
                payment_method=payment_method,
                status='completed',
                total_amount=total,
            )

            # Create SaleItems + deduct stock
            for item in items_data:
                product = product_objects[item['product']]
                SaleItem.objects.create(
                    sale=sale,
                    product=product,
                    quantity=item['quantity'],
                    price=product.price,
                )
                product.stock -= item['quantity']   # <-- stock deduction
                product.save()

        print("✅ SALE SAVED:", sale.id)
        serializer = SaleSerializer(sale)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("❌ SALE ERROR:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ✅ GET ALL SALES (for sales history)
@api_view(['GET'])
def get_sales(request):
    sales = Sale.objects.all().order_by('-created_at')
    serializer = SaleSerializer(sales, many=True)
    return Response(serializer.data)


# ✅ GET SINGLE SALE (for receipt)
@api_view(['GET'])
def get_single_sale(request, pk):
    try:
        sale = Sale.objects.get(id=pk)
        serializer = SaleSerializer(sale)
        return Response(serializer.data)
    except Sale.DoesNotExist:
        return Response({"error": "Sale not found"}, status=status.HTTP_404_NOT_FOUND)


# ✅ SALES SUMMARY (for dashboard)
@api_view(['GET'])
def sales_summary(request):
    sales = Sale.objects.all()
    total_sales = sales.count()
    total_revenue = sum(s.total_amount for s in sales)
    cash_sales = sales.filter(payment_method='cash').count()
    khalti_sales = sales.filter(payment_method='khalti').count()

    return Response({
        "total_sales": total_sales,
        "total_revenue": total_revenue,
        "cash_sales": cash_sales,
        "khalti_sales": khalti_sales,
    })


# ✅ DEMAND FORECAST (AI feature)
@api_view(['GET'])
def demand_forecast(request):
    from django.db.models import Sum
    from django.utils import timezone
    from datetime import timedelta

    today = timezone.now().date()
    results = []

    products = Product.objects.all()
    for product in products:
        monthly = []
        for i in range(1, 4):  # last 3 months
            start = (today.replace(day=1) - timedelta(days=30 * (i - 1)))
            end = (today.replace(day=1) - timedelta(days=30 * i))
            # month i ago: from end to start
            total = SaleItem.objects.filter(
                product=product,
                sale__created_at__date__gte=end,
                sale__created_at__date__lt=start,
                sale__status='completed',
            ).aggregate(total=Sum('quantity'))['total'] or 0
            monthly.append(total)

        # Weighted moving average: recent months count more
        weights = [0.5, 0.3, 0.2]
        forecast = round(sum(m * w for m, w in zip(monthly, weights)))
        last_month = monthly[0]
        change = round(((forecast - last_month) / last_month * 100) if last_month > 0 else 0)

        results.append({
            'product': product.name,
            'product_id': product.id,
            'last_month': last_month,
            'forecast': forecast,
            'change_percent': change,
            'current_stock': product.stock,
        })

    results.sort(key=lambda x: x['forecast'], reverse=True)
    return Response(results)
