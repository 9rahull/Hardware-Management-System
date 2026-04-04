from rest_framework import serializers
from .models import Sale, SaleItem
from analytics.models import Product


class SaleItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = SaleItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']


class SaleSerializer(serializers.ModelSerializer):
    items = SaleItemSerializer(many=True)

    class Meta:
        model = Sale
        fields = ['id', 'customer_name', 'payment_method', 'status', 'total_amount', 'created_at', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')

        # ✅ CREATE SALE
        sale = Sale.objects.create(**validated_data)

        for item_data in items_data:
            product = item_data['product']

            # ✅ REDUCE STOCK AUTOMATICALLY
            product.stock -= item_data['quantity']
            product.save()

            # ✅ SAVE EACH ITEM
            SaleItem.objects.create(sale=sale, **item_data)

        return sale