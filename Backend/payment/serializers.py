from rest_framework import serializers
from .models import VendorPayment


class VendorPaymentSerializer(serializers.ModelSerializer):
    vendor_name = serializers.CharField(source='vendor.name', read_only=True)

    class Meta:
        model = VendorPayment
        fields = ['id', 'vendor', 'vendor_name', 'amount', 'status', 'note', 'date']
        read_only_fields = ['date']

    def validate_amount(self, value):
        if value < 0:
            raise serializers.ValidationError("Amount cannot be negative.")
        return value