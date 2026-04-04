from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Sale
from .serializers import SaleSerializer


# ✅ CREATE SALE (stock reduces automatically via serializer)
@api_view(['POST'])
def create_sale(request):
    print("📥 SALE DATA RECEIVED:", request.data)

    serializer = SaleSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        print("✅ SALE SAVED")
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    print("❌ SALE ERROR:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        "khalti_sales": khalti_sales
    })