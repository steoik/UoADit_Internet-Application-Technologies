from django.db import models

# Create your models here.

class User(models.Model):
    user_name = models.CharField(max_length=25, unique=True)
    password = models.CharField(max_length=25)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_name