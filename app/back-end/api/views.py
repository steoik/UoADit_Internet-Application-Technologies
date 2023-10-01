from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import FileResponse

from rest_framework import status
import django_filters
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import RetrieveAPIView

from django.shortcuts import get_object_or_404

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import CustomUser, Listing, ListingImage
from .serializers import UserSerializer, ListingSerializer, ListingImageSerializer

from rest_framework.parsers import FileUploadParser

@api_view(['GET'])
def getRoutes(request):
 routes = [
   'token',
   'token/refresh',
 ]

 return Response(routes)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

@api_view(['POST', 'GET'])
def users(request):
  # Create a new User
  if request.method == 'POST':
    data = request.data
    password = data.get('password')
    hashed_password = make_password(password)
    user = CustomUser.objects.create(
      username=data.get('username', ''),
      password=hashed_password,
      first_name=data.get('first_name', ''),
      last_name=data.get('last_name', ''),
      email=data.get('email', ''),
      phone=data.get('phone', ''),
      host_request_status=data.get('host_request_status', '')
    )
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
  # Get all Users
  if request.method == 'GET':
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def host_request(request, USERNAME):
  data = request.data
  user = get_object_or_404(CustomUser, username=USERNAME)
  if data.get('status') == 'approved':
    user.role = 'host'
    user.host_request_status  = 'approved'
  elif data.get('status') == 'denied':
    user.host_request_status  = 'denied'
  user.save()
  return Response({'message': 'Host request status updated successfully.'})

@api_view(['POST', 'GET', 'DELETE'])
def avatar(request, USERNAME):
  user = get_object_or_404(CustomUser, username=USERNAME)
  # Update user Avatar
  if request.method == 'POST':
    data = request.data
    user = CustomUser.objects.get(username=USERNAME)
    user.profile_picture = data.get('profile_picture')
    user.save()
    return Response({'User avatar updated successfully!'})
  # Get user Avatar
  if request.method == 'GET':
    if user.profile_picture:
      image_path = user.profile_picture.path
      return FileResponse(open(image_path, 'rb'), content_type='image/jpeg')
    else:
      return Response(None, status=204)
  # Delete the User profile picture

@api_view(['GET'])
def userDetail(request, USERNAME):
  try:
    user = CustomUser.objects.get(username=USERNAME)
  except CustomUser.DoesNotExist:
    pass
  if not user:
    user = get_object_or_404(CustomUser, pk=USERNAME)
    
  serializer = UserSerializer(user)
  return Response(serializer.data)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['role'] = user.role
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

@api_view(['POST'])
def listing(request):
  data = request.data
  host_username = data.get('host', '')
  host_instance = CustomUser.objects.get(username=host_username)

  if request.method == 'POST':
    data = request.data
    listing = Listing(
      title=data.get('title', ''),
      price=float(data.get('price', 0.0)),
      payment=data.get('payment', 'month'),
      location=data.get('location', ''),
      street=data.get('street', ''),
      street_number=int(data.get('street_number', 0)),
      postal_code=int(data.get('postal_code', 0)),
      surface=int(data.get('surface', 0)),
      floor=data.get('floor', ''),
      type=data.get('type', ''),
      description=data.get('description', ''),

      host=host_instance,
      
      minimum_reservation_period=int(data.get('minimum_reservation_period', 1)),
      extra_price_per_guest=float(data.get('extra_price_per_guest', 0.0)),
      maximum_guests=int(data.get('maximum_guests', 1)),
      
      lng=float(data.get('lng', 0.0)),
      lat=float(data.get('lat', 0.0)),
      
      beds=int(data.get('beds', 0)),
      bedrooms=int(data.get('bedrooms', 0)),
      kitchens=int(data.get('kitchens', 0)),
      bathrooms=int(data.get('bathrooms', 0)),
      living_room=int(data.get('living_room', 0)),
      
      wifi = True if data.get('wifi', 'false') == 'true' else False,
      heating = True if data.get('heating', 'false') == 'true' else False,
      cooling = True if data.get('cooling', 'false') == 'true' else False,
      television = True if data.get('television', 'false') == 'true' else False,
      parking = True if data.get('parking', 'false') == 'true' else False,
      elevator = True if data.get('elevator', 'false') == 'true' else False,

      smoking = True if data.get('smoking', 'false') == 'true' else False,
      pets = True if data.get('pets', 'false') == 'true' else False,
      parties = True if data.get('parties', 'false') == 'true' else False,
      
      rating=float(data.get('rating', 0.0)),
      reviews=int(data.get('reviews', 0)),
    )
    listing.save()
    listing_id = listing.listing_id
    serializer = ListingSerializer(listing)
    return Response({'message': 'Listing created successfully!', 'listing_id': listing_id, 'data': serializer.data})

class ListingFilter(django_filters.FilterSet):
    
  priceFrom = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
  priceTo = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
  payment = django_filters.CharFilter(field_name='payment', lookup_expr='iexact')
  location = django_filters.CharFilter(field_name='location', lookup_expr='iexact')
  surfaceFrom = django_filters.NumberFilter(field_name='surface', lookup_expr='gte')
  surfaceTo = django_filters.NumberFilter(field_name='surface', lookup_expr='lte')
  floor = django_filters.CharFilter(field_name='floor', lookup_expr='iexact')
  type = django_filters.CharFilter(field_name='type', lookup_expr='iexact')

  beds = django_filters.NumberFilter(field_name='beds', lookup_expr='gte')
  bedrooms = django_filters.NumberFilter(field_name='bedrooms', lookup_expr='gte')
  kitchens = django_filters.NumberFilter(field_name='kitchens', lookup_expr='gte')
  bathrooms = django_filters.NumberFilter(field_name='bathrooms', lookup_expr='gte')
  living_room = django_filters.NumberFilter(field_name='living_room', lookup_expr='gte')

  wifi = django_filters.BooleanFilter(field_name='wifi')
  heating = django_filters.BooleanFilter(field_name='heating')
  cooling = django_filters.BooleanFilter(field_name='cooling')
  television = django_filters.BooleanFilter(field_name='television')
  parking = django_filters.BooleanFilter(field_name='parking')
  elevator = django_filters.BooleanFilter(field_name='elevator')

  smoking = django_filters.BooleanFilter(field_name='smoking')
  pets = django_filters.BooleanFilter(field_name='pets')
  parties = django_filters.BooleanFilter(field_name='parties')
  
  class Meta:
    model = Listing
    fields = []

# Get specific filtered Listings
class ListingFilterView(generics.ListAPIView):
  queryset = Listing.objects.all()
  serializer_class = ListingSerializer
  filter_backends = (DjangoFilterBackend,)
  filterset_class = ListingFilter

# Get specific Listing
class ListingDetailView(RetrieveAPIView):
  queryset = Listing.objects.all()
  serializer_class = ListingSerializer
  lookup_field = 'listing_id'

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class ListingImageCreateView(generics.CreateAPIView):
  def post(self, request, listing_id):
    try:
      listing = Listing.objects.get(pk=listing_id)
    except Listing.DoesNotExist:
      return Response(
        {'detail': 'Listing not found'},
        status=status.HTTP_404_NOT_FOUND
      )
    data = request.data
    print(data)
    listing_image = ListingImage(
      listing=listing,
      image=data.get('image'),
      primary_image=True if data.get('primary_image', '') == 'True' else False,
    )
    listing_image.save()
    return Response({'Listing image has been created successfully!'})
  

class ListingImageListView(generics.ListAPIView):
  def get(self, request, listing_id):
    try:
      listing = Listing.objects.get(pk=listing_id)
    except Listing.DoesNotExist:
      return Response(
          {'detail': 'Listing not found'},
          status=status.HTTP_404_NOT_FOUND
      )
    images = ListingImage.objects.filter(listing=listing)
    image_data = [{'url': image.image.url, 'primary_image': image.primary_image} for image in images]
    return Response(image_data, status=status.HTTP_200_OK)
    

class ListingImagePrimaryView(generics.ListAPIView):
  def get(self, request, listing_id):
    try:
      listing = Listing.objects.get(pk=listing_id)
    except Listing.DoesNotExist:
      return Response(
          {'detail': 'Listing not found'},
          status=status.HTTP_404_NOT_FOUND
      )
    primary_image = ListingImage.objects.filter(listing=listing, primary_image=True).first()
    return Response({'url': primary_image.image.url}, status=status.HTTP_200_OK)