from rest_framework.serializers import ModelSerializer
from .models import CustomUser, Listing, ListingImage

class UserSerializer(ModelSerializer):
  class Meta:
    model = CustomUser
    fields = '__all__'


class ListingSerializer(ModelSerializer):
  class Meta:
    model = Listing
    fields = '__all__'

class ListingImageSerializer(ModelSerializer):
  class Meta:
    model = ListingImage
    fields = '__all__'