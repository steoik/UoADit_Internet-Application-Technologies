import os
from django.db import models
import imghdr

# Create your models here.
PROFILEPICTURES_PATH = 'assets/profile_pictures/'

class User(models.Model):
    user_name = models.CharField(max_length=25, unique=True)
    password = models.CharField(max_length=25, default='')
    first_name = models.CharField(max_length=50, default='')
    last_name = models.CharField(max_length=50, default='')
    email = models.EmailField(max_length=100, default='')
    phone = models.CharField(max_length=15, default='')
    profile_picture = models.ImageField(upload_to=PROFILEPICTURES_PATH, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_name