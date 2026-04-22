from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from analytics.models import Vendor
from .models import VendorPayment
from .serializers import VendorPaymentSerializer


# ✅ GET all payments + ADD a new payment
@api_view(['GET', 'POST'])
def payment_list(request):

    if request.method == 'GET':
        payments = VendorPayment.objects.all()
        serializer = VendorPaymentSerializer(payments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = VendorPaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ✅ GET single payment / DELETE a payment
@api_view(['GET', 'DELETE'])
def payment_detail(request, pk):
    try:
        payment = VendorPayment.objects.get(id=pk)
    except VendorPayment.DoesNotExist:
        return Response({"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = VendorPaymentSerializer(payment)
        return Response(serializer.data)

    if request.method == 'DELETE':
        payment.delete()
        return Response({"message": "Payment deleted"}, status=status.HTTP_200_OK)


# ✅ Vendor-wise due summary (total owed, paid, remaining)
@api_view(['GET'])
def vendor_due_summary(request):
    vendors = Vendor.objects.all()
    summary = []

    for vendor in vendors:
        payments = VendorPayment.objects.filter(vendor=vendor)
        total_paid = sum(
            float(p.amount) for p in payments if p.status == 'paid'
        )
        total_pending = sum(
            float(p.amount) for p in payments if p.status == 'pending'
        )
        total = total_paid + total_pending

        summary.append({
            "vendor_id":      vendor.id,
            "vendor_name":    vendor.name,
            "vendor_phone":   vendor.phone,
            "total_amount":   total,
            "total_paid":     total_paid,
            "total_pending":  total_pending,
        })

    return Response(summary)