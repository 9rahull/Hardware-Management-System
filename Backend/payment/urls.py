from django.urls import path
from . import views

urlpatterns = [
    path('',           views.payment_list,       name='payment_list'),
    path('<int:pk>/',  views.payment_detail,     name='payment_detail'),
    path('summary/',   views.vendor_due_summary, name='vendor_due_summary'),
]