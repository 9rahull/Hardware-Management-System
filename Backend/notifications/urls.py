from django.urls import path
from .views import low_stock_notifications

urlpatterns = [
    path('', low_stock_notifications),
]