# from rest_framework import serializers
# from .models import Product, Vendor


# class VendorSerializer(serializers.ModelSerializer):  # ✅ ADD THIS BACK
#     class Meta:
#         model = Vendor
#         fields = '__all__'


# class ProductSerializer(serializers.ModelSerializer):
#     # ✅ image not required so update works without re-uploading
#     image = serializers.ImageField(use_url=True, required=False, allow_null=True)

#     vendor_name = serializers.SerializerMethodField()

#     vendor = serializers.PrimaryKeyRelatedField(
#         queryset=Vendor.objects.all(),
#         required=False,
#         allow_null=True
#     )

#     def get_vendor_name(self, obj):
#         if obj.vendor:
#             return obj.vendor.name
#         return None

#     class Meta:
#         model = Product
#         fields = ['id', 'name', 'category', 'price', 'stock', 'image', 'vendor', 'vendor_name']











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

    # ✅ VALIDATION FIX (IMPORTANT)
    def validate(self, data):
        price = data.get('price')
        stock = data.get('stock')

        # ❌ NEGATIVE PRICE
        if price is not None and price < 0:
            raise serializers.ValidationError({
                "price": "Price cannot be negative"
            })

        # ❌ NEGATIVE STOCK
        if stock is not None and stock < 0:
            raise serializers.ValidationError({
                "stock": "Stock cannot be negative"
            })

        return data


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'