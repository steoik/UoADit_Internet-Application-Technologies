# Generated by Django 4.2.4 on 2023-09-21 13:59

import api.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_customuser_host_request_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('listing_id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(max_length=50)),
                ('price', models.FloatField()),
                ('payment', models.CharField(default='month', max_length=10)),
                ('location', models.CharField(default='', max_length=50)),
                ('street', models.CharField(max_length=50)),
                ('street_number', models.IntegerField()),
                ('postal_code', models.IntegerField()),
                ('surface', models.IntegerField()),
                ('floor', models.CharField(max_length=20)),
                ('type', models.CharField(max_length=20)),
                ('description', models.TextField(max_length=500)),
                ('minimum_reservation_period', models.IntegerField()),
                ('extra_price_per_guest', models.FloatField()),
                ('maximum_guests', models.IntegerField()),
                ('lng', models.FloatField(default=0.0)),
                ('lat', models.FloatField(default=0.0)),
                ('beds', models.IntegerField(default=0)),
                ('bedrooms', models.IntegerField(default=0)),
                ('kitchens', models.IntegerField(default=0)),
                ('bathrooms', models.IntegerField(default=0)),
                ('living_room', models.IntegerField(default=0)),
                ('wifi', models.BooleanField(default=False)),
                ('heating', models.BooleanField(default=False)),
                ('cooling', models.BooleanField(default=False)),
                ('television', models.BooleanField(default=False)),
                ('parking', models.BooleanField(default=False)),
                ('elevator', models.BooleanField(default=False)),
                ('smoking', models.BooleanField(default=False)),
                ('pets', models.BooleanField(default=False)),
                ('parties', models.BooleanField(default=False)),
                ('host', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ListingImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(max_length=255, upload_to=api.models.ListingImage.custom_image_path, verbose_name='Image')),
                ('primary_image', models.BooleanField(default=False)),
                ('listing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='api.listing')),
            ],
        ),
    ]
