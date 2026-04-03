# from django.urls import path
# from .views import (
#     get_products,
#     add_product,
#     update_product,
#     delete_product,
#     dashboard_stats,
#     predict_demand_view,
#     restock_recommendation,
#     get_vendors,
#     add_vendor,
#     get_single_product,      
#     vendors_with_count         
# )

# urlpatterns = [
#     path('products/', get_products),
#     path('products/add/', add_product),
#     path('products/update/<int:pk>/', update_product),
#     path('products/delete/<int:pk>/', delete_product),

#     path('products/<int:pk>/', get_single_product),  

#     path('dashboard/', dashboard_stats),
#     path('predict-demand/', predict_demand_view),
#     path('restock/', restock_recommendation),

#     path('vendors/', get_vendors),
#     path('vendors/add/', add_vendor),

#     path('vendors/count/', vendors_with_count),  
# ]








# from django.urls import path
# from .views import *

# urlpatterns = [
#     path('products/', get_products),
#     path('products/add/', add_product),
#     path('products/<int:pk>/', get_single_product),
#     path('products/update/<int:pk>/', update_product),
#     path('products/delete/<int:pk>/', delete_product),

#     path('vendors/', get_vendors),
#     path('vendors/add/', add_vendor),

#     path('dashboard/', dashboard_stats),
# ]



from django.urls import path
from .views import (
    get_products,
    get_single_product,
    add_product,
    update_product,
    delete_product,
    dashboard_stats,
    predict_demand_view,
    restock_recommendation,
    get_vendors,
    add_vendor,
    vendors_with_count
)

urlpatterns = [
    # 🔹 PRODUCTS
    path('products/', get_products),
    path('products/add/', add_product),
    path('products/<int:pk>/', get_single_product),
    path('products/update/<int:pk>/', update_product),
    path('products/delete/<int:pk>/', delete_product),

    # 🔹 DASHBOARD + AI
    path('dashboard/', dashboard_stats),
    path('predict-demand/', predict_demand_view),
    path('restock/', restock_recommendation),

    # 🔹 VENDORS
    path('vendors/', get_vendors),
    path('vendors/add/', add_vendor),
    path('vendors/count/', vendors_with_count),
]