from django.urls import path
from .views import get_products, add_product, update_product, delete_product

urlpatterns = [

    path('products/', get_products),

    path('add-product/', add_product),

    path('update-product/<int:id>/', update_product),

    path('delete-product/<int:id>/', delete_product),

]