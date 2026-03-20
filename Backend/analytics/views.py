from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer


# GET ALL PRODUCTS
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)


# ADD PRODUCT
@api_view(['POST'])
def add_product(request):
    serializer = ProductSerializer(data=request.data, context={'request': request})

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)


# DELETE PRODUCT
@api_view(['DELETE'])
def delete_product(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response({"message": "Deleted successfully"})


# UPDATE PRODUCT 
@api_view(['PUT'])
def update_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    serializer = ProductSerializer(
        product,
        data=request.data,
        partial=True,  
        context={'request': request}
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)

# DASHBOARD
@api_view(['GET'])
def dashboard_stats(request):
    products = Product.objects.all()

    total_products = products.count()
    total_stock = sum(p.stock for p in products)
    total_value = sum(p.price * p.stock for p in products)
    low_stock = products.filter(stock__lt=10).count()

    return Response({
        "total_products": total_products,
        "total_stock": total_stock,
        "low_stock": low_stock,
        "total_value": total_value
    })