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


# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from django.db import transaction
# from .models import Sale, SaleItem
# from .serializers import SaleSerializer
# from analytics.models import Product


# # ✅ CREATE SALE — saves SaleItems + deducts stock
# @api_view(['POST'])
# def create_sale(request):
#     print("📥 SALE DATA RECEIVED:", request.data)

#     items_data = request.data.get('items', [])
#     payment_method = request.data.get('payment_method', 'cash')
#     customer_name = request.data.get('customer_name', '')

#     if not items_data:
#         return Response({"error": "No items provided"}, status=status.HTTP_400_BAD_REQUEST)

#     # --- Validate stock first before touching anything ---
#     errors = []
#     for item in items_data:
#         try:
#             product = Product.objects.get(id=item['product'])
#             if product.stock < item['quantity']:
#                 errors.append(f"{product.name}: only {product.stock} units in stock")
#         except Product.DoesNotExist:
#             errors.append(f"Product ID {item['product']} not found")

#     if errors:
#         return Response({"error": errors}, status=status.HTTP_400_BAD_REQUEST)

#     # --- Save everything atomically ---
#     try:
#         with transaction.atomic():
#             # Calculate total
#             total = 0
#             product_objects = {}
#             for item in items_data:
#                 product = Product.objects.select_for_update().get(id=item['product'])
#                 product_objects[item['product']] = product
#                 total += product.price * item['quantity']

#             # Create Sale
#             sale = Sale.objects.create(
#                 customer_name=customer_name,
#                 payment_method=payment_method,
#                 status='completed',
#                 total_amount=total,
#             )

#             # Create SaleItems + deduct stock
#             for item in items_data:
#                 product = product_objects[item['product']]
#                 SaleItem.objects.create(
#                     sale=sale,
#                     product=product,
#                     quantity=item['quantity'],
#                     price=product.price,
#                 )
#                 product.stock -= item['quantity']   # <-- stock deduction
#                 product.save()

#         print("✅ SALE SAVED:", sale.id)
#         serializer = SaleSerializer(sale)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#     except Exception as e:
#         print("❌ SALE ERROR:", str(e))
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
#         "khalti_sales": khalti_sales,
#     })


# # ✅ DEMAND FORECAST (AI feature)
# @api_view(['GET'])
# def demand_forecast(request):
#     from django.db.models import Sum
#     from django.utils import timezone
#     from datetime import timedelta

#     today = timezone.now().date()
#     results = []

#     products = Product.objects.all()
#     for product in products:
#         monthly = []
#         for i in range(1, 4):  # last 3 months
#             start = (today.replace(day=1) - timedelta(days=30 * (i - 1)))
#             end = (today.replace(day=1) - timedelta(days=30 * i))
#             # month i ago: from end to start
#             total = SaleItem.objects.filter(
#                 product=product,
#                 sale__created_at__date__gte=end,
#                 sale__created_at__date__lt=start,
#                 sale__status='completed',
#             ).aggregate(total=Sum('quantity'))['total'] or 0
#             monthly.append(total)

#         # Weighted moving average: recent months count more
#         weights = [0.5, 0.3, 0.2]
#         forecast = round(sum(m * w for m, w in zip(monthly, weights)))
#         last_month = monthly[0]
#         change = round(((forecast - last_month) / last_month * 100) if last_month > 0 else 0)

#         results.append({
#             'product': product.name,
#             'product_id': product.id,
#             'last_month': last_month,
#             'forecast': forecast,
#             'change_percent': change,
#             'current_stock': product.stock,
#         })

#     results.sort(key=lambda x: x['forecast'], reverse=True)
#     return Response(results)



# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from django.db import transaction
# from django.db.models import Sum
# from django.utils import timezone
# from datetime import timedelta

# from .models import Sale, SaleItem
# from .serializers import SaleSerializer
# from analytics.models import Product


# # ✅ CREATE SALE — saves SaleItems + deducts stock
# @api_view(['POST'])
# def create_sale(request):
#     print("📥 SALE DATA RECEIVED:", request.data)

#     items_data = request.data.get('items', [])
#     payment_method = request.data.get('payment_method', 'cash')
#     customer_name = request.data.get('customer_name', '')

#     if not items_data:
#         return Response({"error": "No items provided"}, status=status.HTTP_400_BAD_REQUEST)

#     # --- Validate stock first ---
#     errors = []
#     for item in items_data:
#         try:
#             product = Product.objects.get(id=item['product'])
#             if product.stock < item['quantity']:
#                 errors.append(f"{product.name}: only {product.stock} units in stock")
#         except Product.DoesNotExist:
#             errors.append(f"Product ID {item['product']} not found")

#     if errors:
#         return Response({"error": errors}, status=status.HTTP_400_BAD_REQUEST)

#     try:
#         with transaction.atomic():
#             total = 0
#             product_objects = {}

#             for item in items_data:
#                 product = Product.objects.select_for_update().get(id=item['product'])
#                 product_objects[item['product']] = product
#                 total += product.price * item['quantity']

#             sale = Sale.objects.create(
#                 customer_name=customer_name,
#                 payment_method=payment_method,
#                 status='completed',
#                 total_amount=total,
#             )

#             for item in items_data:
#                 product = product_objects[item['product']]
#                 SaleItem.objects.create(
#                     sale=sale,
#                     product=product,
#                     quantity=item['quantity'],
#                     price=product.price,
#                 )
#                 product.stock -= item['quantity']
#                 product.save()

#         print("✅ SALE SAVED:", sale.id)
#         serializer = SaleSerializer(sale)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#     except Exception as e:
#         print("❌ SALE ERROR:", str(e))
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# # ✅ GET ALL SALES
# @api_view(['GET'])
# def get_sales(request):
#     sales = Sale.objects.all().order_by('-created_at')
#     serializer = SaleSerializer(sales, many=True)
#     return Response(serializer.data)


# # ✅ GET SINGLE SALE
# @api_view(['GET'])
# def get_single_sale(request, pk):
#     try:
#         sale = Sale.objects.get(id=pk)
#         serializer = SaleSerializer(sale)
#         return Response(serializer.data)
#     except Sale.DoesNotExist:
#         return Response({"error": "Sale not found"}, status=status.HTTP_404_NOT_FOUND)


# # ✅ SALES SUMMARY
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
#         "khalti_sales": khalti_sales,
#     })


# # ✅ DEMAND FORECAST (FIXED AI LOGIC)
# @api_view(['GET'])
# def demand_forecast(request):

#     today = timezone.now()
#     results = []

#     for product in Product.objects.all():

#         # 🔥 Proper last 3 months (by days)
#         month1_start = today - timedelta(days=30)
#         month2_start = today - timedelta(days=60)
#         month3_start = today - timedelta(days=90)

#         # 🔹 Last month
#         month1 = SaleItem.objects.filter(
#             product=product,
#             sale__created_at__gte=month1_start,
#             sale__status='completed',
#         ).aggregate(total=Sum('quantity'))['total'] or 0

#         # 🔹 2nd month
#         month2 = SaleItem.objects.filter(
#             product=product,
#             sale__created_at__gte=month2_start,
#             sale__created_at__lt=month1_start,
#             sale__status='completed',
#         ).aggregate(total=Sum('quantity'))['total'] or 0

#         # 🔹 3rd month
#         month3 = SaleItem.objects.filter(
#             product=product,
#             sale__created_at__gte=month3_start,
#             sale__created_at__lt=month2_start,
#             sale__status='completed',
#         ).aggregate(total=Sum('quantity'))['total'] or 0

#         # 🔥 Weighted moving average (better AI feel)
#         forecast = round((month1 * 0.6) + (month2 * 0.3) + (month3 * 0.1))

#         # 🔥 FIXED CHANGE %
#         if month1 == 0:
#             change = 0
#         else:
#             change = round(((forecast - month1) / month1) * 100, 2)

#         results.append({
#             'product': product.name,
#             'product_id': product.id,
#             'last_month': month1,
#             'forecast': forecast,
#             'change_percent': change,
#             'current_stock': product.stock,
#         })

#     # 🔥 Sort by demand
#     results.sort(key=lambda x: x['forecast'], reverse=True)

#     return Response(results)





from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.db.models import Sum
from django.utils import timezone
from datetime import timedelta

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

    # 🔹 Validate stock first
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

    try:
        with transaction.atomic():
            total = 0
            product_objects = {}

            # 🔹 Lock products + calculate total
            for item in items_data:
                product = Product.objects.select_for_update().get(id=item['product'])
                product_objects[item['product']] = product
                total += product.price * item['quantity']

            # 🔹 Create sale
            sale = Sale.objects.create(
                customer_name=customer_name,
                payment_method=payment_method,
                status='completed',
                total_amount=total,
            )

            # 🔹 Create SaleItems + update stock
            for item in items_data:
                product = product_objects[item['product']]
                SaleItem.objects.create(
                    sale=sale,
                    product=product,
                    quantity=item['quantity'],
                    price=product.price,
                )
                product.stock -= item['quantity']
                product.save()

        print("✅ SALE SAVED:", sale.id)
        serializer = SaleSerializer(sale)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("❌ SALE ERROR:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ✅ GET ALL SALES
@api_view(['GET'])
def get_sales(request):
    sales = Sale.objects.all().order_by('-created_at')
    serializer = SaleSerializer(sales, many=True)
    return Response(serializer.data)


# ✅ GET SINGLE SALE (receipt)
@api_view(['GET'])
def get_single_sale(request, pk):
    try:
        sale = Sale.objects.get(id=pk)
        serializer = SaleSerializer(sale)
        return Response(serializer.data)
    except Sale.DoesNotExist:
        return Response({"error": "Sale not found"}, status=status.HTTP_404_NOT_FOUND)


# ✅ SALES SUMMARY (dashboard)
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


# ✅ DEMAND FORECAST (AI FEATURE — FINAL)
@api_view(['GET'])
def demand_forecast(request):

    today = timezone.now()
    results = []

    for product in Product.objects.all():

        # 🔹 Last 3 months ranges
        m1 = today - timedelta(days=30)
        m2 = today - timedelta(days=60)
        m3 = today - timedelta(days=90)

        # 🔹 Monthly sales
        month1 = SaleItem.objects.filter(
            product=product,
            sale__created_at__gte=m1,
            sale__status='completed'
        ).aggregate(total=Sum('quantity'))['total'] or 0

        month2 = SaleItem.objects.filter(
            product=product,
            sale__created_at__gte=m2,
            sale__created_at__lt=m1,
            sale__status='completed'
        ).aggregate(total=Sum('quantity'))['total'] or 0

        month3 = SaleItem.objects.filter(
            product=product,
            sale__created_at__gte=m3,
            sale__created_at__lt=m2,
            sale__status='completed'
        ).aggregate(total=Sum('quantity'))['total'] or 0

        # 🔥 Weighted Forecast (AI)
        forecast = round((month1 * 0.6) + (month2 * 0.3) + (month3 * 0.1))

        # 🔥 Demand Score (NEW AI LOGIC)
        score = round((forecast / (month1 + 1)) * 50)

        if score > 70:
            status_label = "High Demand 🔥"
            status = "high"
        elif score < 40:
            status_label = "Low Demand 📉"
            status = "low"
        else:
            status_label = "Stable ⚖"
            status = "stable"

        results.append({
            "product": product.name,
            "product_id": product.id,
            "last_month": month1,
            "forecast": forecast,
            "current_stock": product.stock,
            "demand_score": score,
            "status": status,
            "status_label": status_label,
        })

    # 🔹 Sort by highest demand
    results.sort(key=lambda x: x['forecast'], reverse=True)

    return Response(results)





# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from django.db import transaction
# from django.db.models import Sum
# from django.utils import timezone
# from .models import Sale, SaleItem
# from .serializers import SaleSerializer
# from analytics.models import Product
# import calendar


# # ✅ CREATE SALE — saves SaleItems + deducts stock
# @api_view(['POST'])
# def create_sale(request):
#     print("📥 SALE DATA RECEIVED:", request.data)

#     items_data = request.data.get('items', [])
#     payment_method = request.data.get('payment_method', 'cash')
#     customer_name = request.data.get('customer_name', '')

#     if not items_data:
#         return Response({"error": "No items provided"}, status=status.HTTP_400_BAD_REQUEST)

#     errors = []
#     for item in items_data:
#         try:
#             product = Product.objects.get(id=item['product'])
#             if product.stock < item['quantity']:
#                 errors.append(f"{product.name}: only {product.stock} units in stock")
#         except Product.DoesNotExist:
#             errors.append(f"Product ID {item['product']} not found")

#     if errors:
#         return Response({"error": errors}, status=status.HTTP_400_BAD_REQUEST)

#     try:
#         with transaction.atomic():
#             total = 0
#             product_objects = {}
#             for item in items_data:
#                 product = Product.objects.select_for_update().get(id=item['product'])
#                 product_objects[item['product']] = product
#                 total += product.price * item['quantity']

#             sale = Sale.objects.create(
#                 customer_name=customer_name,
#                 payment_method=payment_method,
#                 status='completed',
#                 total_amount=total,
#             )

#             for item in items_data:
#                 product = product_objects[item['product']]
#                 SaleItem.objects.create(
#                     sale=sale,
#                     product=product,
#                     quantity=item['quantity'],
#                     price=product.price,
#                 )
#                 product.stock -= item['quantity']
#                 product.save()

#         print("✅ SALE SAVED:", sale.id)
#         serializer = SaleSerializer(sale)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#     except Exception as e:
#         print("❌ SALE ERROR:", str(e))
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# # ✅ GET ALL SALES
# @api_view(['GET'])
# def get_sales(request):
#     sales = Sale.objects.all().order_by('-created_at')
#     serializer = SaleSerializer(sales, many=True)
#     return Response(serializer.data)


# # ✅ GET SINGLE SALE
# @api_view(['GET'])
# def get_single_sale(request, pk):
#     try:
#         sale = Sale.objects.get(id=pk)
#         serializer = SaleSerializer(sale)
#         return Response(serializer.data)
#     except Sale.DoesNotExist:
#         return Response({"error": "Sale not found"}, status=status.HTTP_404_NOT_FOUND)


# # ✅ SALES SUMMARY
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
#         "khalti_sales": khalti_sales,
#     })


# def get_month_range(year, month):
#     """Return (first_day, last_day) for a given year and month."""
#     first_day = timezone.datetime(year, month, 1).date()
#     last_day_num = calendar.monthrange(year, month)[1]
#     last_day = timezone.datetime(year, month, last_day_num).date()
#     return first_day, last_day


# # ✅ DEMAND FORECAST (AI feature) — FIXED date logic
# @api_view(['GET'])
# def demand_forecast(request):
#     today = timezone.now().date()
#     results = []

#     def get_month_start_end(months_ago):
#         """Get first and last day of a month, X months ago."""
#         month = today.month - months_ago
#         year = today.year
#         while month <= 0:
#             month += 12
#             year -= 1
#         return get_month_range(year, month)

#     products = Product.objects.all()
#     for product in products:
#         monthly = []

#         for months_ago in range(1, 4):  # 1=last month, 2=two months ago, 3=three months ago
#             first_day, last_day = get_month_start_end(months_ago)

#             total = SaleItem.objects.filter(
#                 product=product,
#                 sale__created_at__date__gte=first_day,
#                 sale__created_at__date__lte=last_day,
#                 sale__status='completed',
#             ).aggregate(total=Sum('quantity'))['total'] or 0

#             monthly.append(total)

#         # Remove this print after confirming it works
#         print(f"📊 {product.name}: monthly={monthly}")

#         # Weighted moving average: most recent = 50%, 2 months ago = 30%, 3 months ago = 20%
#         weights = [0.5, 0.3, 0.2]
#         forecast = round(sum(m * w for m, w in zip(monthly, weights)))
#         last_month = monthly[0]
#         change = round(((forecast - last_month) / last_month * 100) if last_month > 0 else 0)

#         results.append({
#             'product': product.name,
#             'product_id': product.id,
#             'last_month': last_month,
#             'forecast': forecast,
#             'change_percent': change,
#             'current_stock': product.stock,
#         })

#     results.sort(key=lambda x: x['forecast'], reverse=True)
#     return Response(results)