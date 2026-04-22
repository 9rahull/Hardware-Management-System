from django.db import models
from django.core.validators import MinValueValidator
from analytics.models import Vendor


class VendorPayment(models.Model):
    STATUS_CHOICES = [
        ('paid',    'Paid'),
        ('pending', 'Pending'),
    ]

    vendor = models.ForeignKey(
        Vendor,
        on_delete=models.CASCADE,
        related_name='payments'
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending'
    )
    note = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.vendor.name} | Rs {self.amount} | {self.status}"

    class Meta:
        ordering = ['-date']