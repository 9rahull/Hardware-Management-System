from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_sale, name='create_sale'),
    path('', views.get_sales, name='get_sales'),
    path('<int:pk>/', views.get_single_sale, name='get_single_sale'),
    path('summary/', views.sales_summary, name='sales_summary'),
]