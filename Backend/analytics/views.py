from django.http import JsonResponse
from .models import Product
import json
from django.views.decorators.csrf import csrf_exempt


# GET ALL PRODUCTS
def get_products(request):
    products = list(Product.objects.values())
    return JsonResponse(products, safe=False)


# ADD PRODUCT
@csrf_exempt
def add_product(request):
    if request.method == "POST":
        name = request.POST.get("name")
        category = request.POST.get("category")
        price = request.POST.get("price")
        stock = request.POST.get("stock")
        image = request.FILES.get("image")

        Product.objects.create(
            name=name,
            category=category,
            price=price,
            stock=stock,
            image=image
        )

        return JsonResponse({"message": "Product added successfully"})


# UPDATE PRODUCT
@csrf_exempt
def update_product(request, id):
    if request.method == "PUT":
        data = json.loads(request.body)

        product = Product.objects.get(id=id)
        product.name = data.get("name")
        product.category = data.get("category")
        product.price = data.get("price")
        product.stock = data.get("stock")
        product.save()

        return JsonResponse({"message": "Product updated"})


# DELETE PRODUCT
@csrf_exempt
def delete_product(request, id):
    if request.method == "DELETE":
        product = Product.objects.get(id=id)
        product.delete()
        return JsonResponse({"message": "Product deleted"})


# DASHBOARD API
def dashboard_stats(request):
    products = Product.objects.all()

    total_products = products.count()
    total_stock = sum(p.stock for p in products)
    low_stock = products.filter(stock__lt=5).count()
    total_value = sum(p.stock * p.price for p in products)

    return JsonResponse({
        "total_products": total_products,
        "total_stock": total_stock,
        "low_stock": low_stock,
        "total_value": total_value
    })