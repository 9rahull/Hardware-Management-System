# from rest_framework import serializers
# from .models import Product, Vendor


# class ProductSerializer(serializers.ModelSerializer):
#     image = serializers.ImageField(use_url=True)

    
#     vendor_name = serializers.CharField(source='vendor.name', read_only=True)
#     vendor = serializers.PrimaryKeyRelatedField(
#         queryset=Vendor.objects.all(),
#         required=False,
#         allow_null=True
#     )

#     class Meta:
#         model = Product
#         fields = '__all__'


# class VendorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Vendor
#         fields = '__all__'





# from rest_framework import serializers
# from .models import Product, Vendor


# class ProductSerializer(serializers.ModelSerializer):
#     image = serializers.ImageField(use_url=True)

#     # ✅ This reads vendor.name from the related Vendor object
#     vendor_name = serializers.SerializerMethodField()

#     vendor = serializers.PrimaryKeyRelatedField(
#         queryset=Vendor.objects.all(),
#         required=False,
#         allow_null=True
#     )

#     def get_vendor_name(self, obj):
#         # ✅ Safely return vendor name or None
#         if obj.vendor:
#             return obj.vendor.name
#         return None

#     class Meta:
#         model = Product
#         # ✅ FIX: explicitly list fields so vendor_name is included
#         fields = ['id', 'name', 'category', 'price', 'stock', 'image', 'vendor', 'vendor_name']


# class VendorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Vendor
#         fields = '__all__'



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