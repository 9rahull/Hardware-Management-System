from django.contrib import admin
from .models import VendorPayment


@admin.register(VendorPayment)
class VendorPaymentAdmin(admin.ModelAdmin):
    list_display  = ['id', 'vendor', 'amount', 'status', 'date']
    list_filter   = ['status']
    search_fields = ['vendor__name']