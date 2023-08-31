from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager

PROFILEPICTURES_PATH = 'assets/profile_pictures/'

# class User(models.Model):
#     role = models.CharField(max_length=25, default='tenant')
#     user_name = models.CharField(max_length=25, unique=True)
#     password = models.CharField(max_length=25, default='')
#     first_name = models.CharField(max_length=50, default='')
#     last_name = models.CharField(max_length=50, default='')
#     email = models.EmailField(max_length=100, default='')
#     phone = models.CharField(max_length=15, default='')
#     profile_picture = models.ImageField(upload_to=PROFILEPICTURES_PATH, null=True, blank=True)
#     created = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.user_name
    

class CustomUserManager(BaseUserManager):
  def create_user(self, username, email, password, **other_fields):
      email = self.normalize_email(email)
      user = self.model(username=username, email=email, **other_fields)
      user.set_password(password)
      user.save()
      return user
  
  def create_superuser(self, username, email, password, **other_fields):
    other_fields.setdefault('is_staff', True)
    other_fields.setdefault('is_superuser', True)
    other_fields.setdefault('role', 'admin')

    if other_fields.get('is_staff') is not True:
        raise ValueError('Superuser must have is_staff=True.')
    if other_fields.get('is_superuser') is not True:
        raise ValueError('Superuser must have is_superuser=True.')

    return self.create_user(username, email, password, **other_fields)
    
class CustomUser(AbstractUser, PermissionsMixin):
  # _DEFAULT_USER_FIELDS_ :
  # username
  # password
  # email
  # first_name
  # last_name
  # groups
  # user_permissions
  # is_staff
  # is_active
  # is_superuser
  # last_login
  # date_joined
  role = models.CharField(max_length=25, default='tenant')
  phone = models.CharField(max_length=15, default='')
  profile_picture = models.ImageField(upload_to=PROFILEPICTURES_PATH, null=True, blank=True)
  host_request_status = models.CharField(max_length=15, default='') # ['', 'pending', 'approved', 'denied']

  objects = CustomUserManager()
  USERNAME_FIELD = 'username'
  REQUIRED_FIELDS = ['email']

  def __str__(self):
      return self.username
