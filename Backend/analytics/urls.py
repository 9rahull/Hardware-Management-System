from django.urls import path
from .views import (
    get_products,
    add_product,
    update_product,
    delete_product,
    dashboard_stats,
    predict_demand_view
)

urlpatterns = [
    path('products/', get_products),
    path('products/add/', add_product),
    path('products/update/<int:pk>/', update_product),
    path('products/delete/<int:pk>/', delete_product),
    path('dashboard/', dashboard_stats),

    # ✅ ADD THIS (IMPORTANT)
    path('predict-demand/', predict_demand_view),
]