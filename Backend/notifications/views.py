from rest_framework.decorators import api_view
from rest_framework.response import Response
from analytics.models import Product  # import from your main app

@api_view(['GET'])
def low_stock_notifications(request):
    products = Product.objects.filter(stock__lt=10)

    data = []
    for p in products:
        data.append({
            "id": p.id,
            "name": p.name,
            "stock": p.stock,
            "message": f"{p.name} is low in stock ({p.stock} left)"
        })

    return Response(data)