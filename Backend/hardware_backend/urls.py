from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # ✅ PRODUCTS API
    path('api/', include('analytics.urls')),

    # ✅ ACCOUNTS API
    path('api/accounts/', include('accounts.urls')),

    # ✅ SALES API
    path('api/sales/', include('sales.urls')),  # ✅ only this line added
]

# ✅ MEDIA FILES
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)