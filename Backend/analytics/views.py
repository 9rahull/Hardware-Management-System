from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Product
import json


# READ (GET PRODUCTS)
def get_products(request):
    products = list(Product.objects.values())

    for product in products:
        if product["image"]:
            product["image"] = "/media/" + str(product["image"])

    return JsonResponse(products, safe=False)


# CREATE (ADD PRODUCT)
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

        return JsonResponse({"message": "Product added"})


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