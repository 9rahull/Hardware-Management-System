from rest_framework import serializers
from .models import Product, Vendor


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    
    vendor_name = serializers.CharField(source='vendor.name', read_only=True)
    vendor = serializers.PrimaryKeyRelatedField(
        queryset=Vendor.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Product
        fields = '__all__'


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'