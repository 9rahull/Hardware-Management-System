from django.db import migrations, models
import django.core.validators
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("analytics", "0007_alter_product_price_alter_product_stock_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="VendorPayment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("amount", models.DecimalField(
                    decimal_places=2,
                    max_digits=10,
                    validators=[django.core.validators.MinValueValidator(0)],
                )),
                ("status", models.CharField(
                    choices=[("paid", "Paid"), ("pending", "Pending")],
                    default="pending",
                    max_length=10,
                )),
                ("note", models.TextField(blank=True, null=True)),
                ("date", models.DateField(auto_now_add=True)),
                ("vendor", models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name="payments",
                    to="analytics.vendor",
                )),
            ],
            options={"ordering": ["-date"]},
        ),
    ]