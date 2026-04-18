# from django.db import models


# # ✅ VENDOR FIRST (IMPORTANT)
# class Vendor(models.Model):
#     name = models.CharField(max_length=100)
#     phone = models.CharField(max_length=20)
#     address = models.TextField()

#     def __str__(self):
#         return self.name


# # ✅ PRODUCT (NOW CAN USE VENDOR)
# class Product(models.Model):
#     name = models.CharField(max_length=100)
#     category = models.CharField(max_length=100)
#     price = models.IntegerField()
#     stock = models.IntegerField()
#     image = models.ImageField(upload_to='products/')

#     # ✅ LINK TO VENDOR
#     vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, null=True, blank=True)

#     def __str__(self):
#         return self.name


# # ✅ SALE MODEL
# class Sale(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity = models.IntegerField()
#     date = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.product.name} - {self.quantity}"



from django.db import models
from django.core.validators import MinValueValidator


# ✅ VENDOR
class Vendor(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    address = models.TextField()

    def __str__(self):
        return self.name


# ✅ PRODUCT
class Product(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)

    # 🔥 FIXED VALIDATION HERE
    price = models.IntegerField(validators=[MinValueValidator(0)])
    stock = models.IntegerField(validators=[MinValueValidator(0)])

    image = models.ImageField(upload_to='products/')

    vendor = models.ForeignKey(
        Vendor,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name


# ✅ SALE
class Sale(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])  # also fix here
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} - {self.quantity}"