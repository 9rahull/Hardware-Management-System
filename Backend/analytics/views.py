# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework.pagination import PageNumberPagination
# from django.db.models import Count

# from .models import Product, Sale, Vendor
# from .serializers import ProductSerializer, VendorSerializer
# from .predict_demand import predict_demand


# # ✅ PAGINATION
# class CustomPagination(PageNumberPagination):
#     page_size = 6


# # ✅ GET ALL PRODUCTS
# @api_view(['GET'])
# def get_products(request):
#     products = Product.objects.all().order_by('id')

#     paginator = CustomPagination()
#     result_page = paginator.paginate_queryset(products, request)

#     serializer = ProductSerializer(
#         result_page,
#         many=True,
#         context={'request': request}
#     )

#     return paginator.get_paginated_response(serializer.data)


# # ✅ GET SINGLE PRODUCT (🔥 IMPORTANT FIX)
# @api_view(['GET'])
# def get_single_product(request, pk):
#     try:
#         product = Product.objects.get(id=pk)
#         serializer = ProductSerializer(product, context={'request': request})
#         return Response(serializer.data)
#     except Product.DoesNotExist:
#         return Response({"error": "Product not found"}, status=404)


# # ✅ ADD PRODUCT
# @api_view(['POST'])
# def add_product(request):
#     serializer = ProductSerializer(data=request.data, context={'request': request})

#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)

#     return Response(serializer.errors)


# # ✅ UPDATE PRODUCT
# @api_view(['PUT'])
# def update_product(request, pk):
#     product = Product.objects.get(id=pk)

#     serializer = ProductSerializer(
#         product,
#         data=request.data,
#         context={'request': request}
#     )

#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)

#     return Response(serializer.errors)


# # ✅ DELETE PRODUCT
# @api_view(['DELETE'])
# def delete_product(request, pk):
#     product = Product.objects.get(id=pk)
#     product.delete()
#     return Response({"message": "Deleted successfully"})


# # ✅ DASHBOARD
# @api_view(['GET'])
# def dashboard_stats(request):
#     products = Product.objects.all()

#     total_products = products.count()
#     total_stock = sum(p.stock for p in products)
#     total_value = sum(p.price * p.stock for p in products)
#     low_stock = products.filter(stock__lt=10).count()

#     return Response({
#         "total_products": total_products,
#         "total_stock": total_stock,
#         "low_stock": low_stock,
#         "total_value": total_value
#     })


# # ✅ AI DEMAND
# @api_view(['GET'])
# def predict_demand_view(request):
#     sales = Sale.objects.all().order_by('date')

#     sales_data = [s.quantity for s in sales]

#     if len(sales_data) < 3:
#         return Response({"error": "Not enough data"})

#     predictions = predict_demand(sales_data)

#     message = "⚠️ High demand expected — restock soon" if max(predictions) > 20 else "✅ Stock level is sufficient"

#     return Response({
#         "predictions": predictions,
#         "message": message
#     })


# # ✅ RESTOCK
# @api_view(['GET'])
# def restock_recommendation(request):
#     products = Product.objects.all()

#     recommendations = []

#     for product in products:
#         if product.stock <= 5:
#             status = "🚨 Urgent Restock"
#             priority = 1
#         elif product.stock <= 10:
#             status = "⚠️ Low Stock"
#             priority = 2
#         else:
#             status = "✅ Sufficient"
#             priority = 3

#         recommendations.append({
#             "name": product.name,
#             "stock": product.stock,
#             "status": status,
#             "priority": priority
#         })

#     recommendations.sort(key=lambda x: x["priority"])

#     return Response({"recommendations": recommendations})


# # ✅ GET VENDORS
# @api_view(['GET'])
# def get_vendors(request):
#     vendors = Vendor.objects.all()
#     serializer = VendorSerializer(vendors, many=True)
#     return Response(serializer.data)


# # ✅ ADD VENDOR
# @api_view(['POST'])
# def add_vendor(request):
#     serializer = VendorSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors)


# # ✅ VENDOR WITH COUNT
# @api_view(['GET'])
# def vendors_with_count(request):
#     vendors = Vendor.objects.annotate(product_count=Count('product'))

#     data = []
#     for v in vendors:
#         data.append({
#             "id": v.id,
#             "name": v.name,
#             "phone": v.phone,
#             "address": v.address,
#             "product_count": v.product_count
#         })

#     return Response(data)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count

from .models import Product, Sale, Vendor
from .serializers import ProductSerializer, VendorSerializer
from .predict_demand import predict_demand


# ✅ PAGINATION
class CustomPagination(PageNumberPagination):
    page_size = 6


# ✅ GET ALL PRODUCTS
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all().order_by('id')

    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(products, request)

    serializer = ProductSerializer(
        result_page,
        many=True,
        context={'request': request}   # ✅ IMPORTANT FOR IMAGE URL
    )

    return paginator.get_paginated_response(serializer.data)


# ✅ GET SINGLE PRODUCT
@api_view(['GET'])
def get_single_product(request, pk):
    try:
        product = Product.objects.get(id=pk)

        serializer = ProductSerializer(
            product,
            context={'request': request}   # ✅ IMPORTANT
        )

        return Response(serializer.data)

    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)


# ✅ ADD PRODUCT (🔥 DEBUG ENABLED)
@api_view(['POST'])
def add_product(request):
    print("📥 DATA RECEIVED:", request.data)

    serializer = ProductSerializer(
        data=request.data,
        context={'request': request}
    )

    if serializer.is_valid():
        serializer.save()
        print("✅ PRODUCT SAVED")
        return Response(serializer.data)

    print("❌ ERRORS:", serializer.errors)
    return Response(serializer.errors)


# ✅ UPDATE PRODUCT
@api_view(['PUT'])
def update_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    serializer = ProductSerializer(
        product,
        data=request.data,
        context={'request': request}
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    print("❌ UPDATE ERROR:", serializer.errors)
    return Response(serializer.errors)


# ✅ DELETE PRODUCT
@api_view(['DELETE'])
def delete_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
        product.delete()
        return Response({"message": "Deleted successfully"})
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)


# ✅ DASHBOARD
@api_view(['GET'])
def dashboard_stats(request):
    products = Product.objects.all()

    return Response({
        "total_products": products.count(),
        "total_stock": sum(p.stock for p in products),
        "low_stock": products.filter(stock__lt=10).count(),
        "total_value": sum(p.price * p.stock for p in products)
    })


# ✅ AI DEMAND
@api_view(['GET'])
def predict_demand_view(request):
    sales = Sale.objects.all().order_by('date')

    sales_data = [s.quantity for s in sales]

    if len(sales_data) < 3:
        return Response({"error": "Not enough data"})

    predictions = predict_demand(sales_data)

    message = "⚠️ High demand expected — restock soon" if max(predictions) > 20 else "✅ Stock level is sufficient"

    return Response({
        "predictions": predictions,
        "message": message
    })


# ✅ RESTOCK
@api_view(['GET'])
def restock_recommendation(request):
    products = Product.objects.all()

    recommendations = []

    for product in products:
        if product.stock <= 5:
            status = "🚨 Urgent Restock"
            priority = 1
        elif product.stock <= 10:
            status = "⚠️ Low Stock"
            priority = 2
        else:
            status = "✅ Sufficient"
            priority = 3

        recommendations.append({
            "name": product.name,
            "stock": product.stock,
            "status": status,
            "priority": priority
        })

    recommendations.sort(key=lambda x: x["priority"])

    return Response({"recommendations": recommendations})


# ✅ GET VENDORS
@api_view(['GET'])
def get_vendors(request):
    vendors = Vendor.objects.all()
    serializer = VendorSerializer(vendors, many=True)
    return Response(serializer.data)


# ✅ ADD VENDOR
@api_view(['POST'])
def add_vendor(request):
    serializer = VendorSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)


# ✅ VENDORS WITH COUNT
@api_view(['GET'])
def vendors_with_count(request):
    vendors = Vendor.objects.annotate(product_count=Count('product'))

    data = []
    for v in vendors:
        data.append({
            "id": v.id,
            "name": v.name,
            "phone": v.phone,
            "address": v.address,
            "product_count": v.product_count
        })

    return Response(data)