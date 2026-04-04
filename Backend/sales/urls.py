urlpatterns = [
    path('api/', include('analytics.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('api/sales/', include('sales.urls')),   # ✅ add this
]