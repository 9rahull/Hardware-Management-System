from rest_framework import serializers
from .models import Product, Vendor


class VendorSerializer(serializers.ModelSerializer):  # ✅ ADD THIS BACK
    class Meta:
        model = Vendor
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    # ✅ image not required so update works without re-uploading
    image = serializers.ImageField(use_url=True, required=False, allow_null=True)

    vendor_name = serializers.SerializerMethodField()

    vendor = serializers.PrimaryKeyRelatedField(
        queryset=Vendor.objects.all(),
        required=False,
        allow_null=True
    )

    def get_vendor_name(self, obj):
        if obj.vendor:
            return obj.vendor.name
        return None

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'price', 'stock', 'image', 'vendor', 'vendor_name']