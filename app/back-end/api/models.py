from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager

from django.core.validators import MinValueValidator

PROFILEPICTURES_PATH = 'assets/profile_pictures/'
LISTING_IMAGES_PATH = 'assets/listing_images/'

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
  



class Listing(models.Model):
  # General Info
  listing_id = models.AutoField(primary_key=True, unique=True)
  title = models.CharField(max_length=50)
  price = models.FloatField()
  payment = models.CharField(max_length=25, default='month')  # Month / Night
  location = models.CharField(max_length=50, default='')
  street = models.CharField(max_length=50)
  street_number = models.IntegerField()
  postal_code = models.IntegerField()
  surface = models.IntegerField()  # In sq meters
  floor = models.CharField(max_length=25)  # Basement, ground, 1/2/3...
  type = models.CharField(max_length=25)  # διαμέρισμα, μεζονέτα, μονοκατοικία
  description = models.TextField(max_length=500)
  # Host
  host = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  # For month payment listings
  minimum_reservation_period = models.IntegerField(default=1, validators=[MinValueValidator(1)])
  extra_price_per_guest = models.FloatField(default=0.0, validators=[MinValueValidator(0.0)])
  maximum_guests = models.IntegerField(default=1, validators=[MinValueValidator(1)])
  # Map
  lng = models.FloatField(default=0.0)
  lat = models.FloatField(default=0.0)
  # Space Info
  beds = models.IntegerField(default=0, validators=[MinValueValidator(0)])
  bedrooms = models.IntegerField(default=0, validators=[MinValueValidator(0)])
  kitchens = models.IntegerField(default=0, validators=[MinValueValidator(0)])
  bathrooms = models.IntegerField(default=0, validators=[MinValueValidator(0)])
  living_room = models.IntegerField(default=0, validators=[MinValueValidator(0)])
  # Provisions
  wifi = models.BooleanField(default=False)
  heating = models.BooleanField(default=False)
  cooling = models.BooleanField(default=False)
  television = models.BooleanField(default=False)
  parking = models.BooleanField(default=False)
  elevator = models.BooleanField(default=False)
  # Rules
  smoking = models.BooleanField(default=False)
  pets = models.BooleanField(default=False)
  parties = models.BooleanField(default=False)
  # Other
  rating = models.FloatField(default=0.0)
  reviews = models.IntegerField(default=0, validators=[MinValueValidator(0)])

  def __str__(self):
      return self.title
    
class ListingImage(models.Model):

  def custom_image_path(self, filename):
      return f'{LISTING_IMAGES_PATH}/{self.listing_id}/{filename}'

  listing = models.ForeignKey(Listing, related_name='images', on_delete=models.CASCADE)
  image = models.ImageField(upload_to=custom_image_path, max_length=255, verbose_name='Image')
  primary_image = models.BooleanField(default=False)

  def __str__(self):
      return f"Image for {self.listing.title}"
