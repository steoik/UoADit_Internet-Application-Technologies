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
  # Create a new Listing
  if request.method == 'POST':
    serializer = ListingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'Listing created successfully!'})
    return Response({'Failed to create Listing.'})

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

# class ListingImageCreateView(generics.CreateAPIView):
#     queryset = ListingImage.objects.all()
#     serializer_class = ListingImageSerializer
#     parser_classes = (FileUploadParser,)

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# def ListingImage(request, listing_id):
#   # Get the Listing object
#   listing = Listing.objects.get(pk=listing_id)
#   image = request.FILES.get('image')
#   primary_image = request.data.get('primary_image', False)
#   if image:
#     # Create a new ListingImage instance
#     listing_image = ListingImage(listing=listing, image=image, primary_image=primary_image)
#     listing_image.save()
#     return Response({'message': 'Image uploaded successfully'}, status=status.HTTP_201_CREATED)
#   else:
#       return Response({'message': 'Image not provided'}, status=status.HTTP_400_BAD_REQUEST)
  



# class ListingImageListView(generics.ListAPIView):
#   serializer_class = ListingImageSerializer

#   def get_queryset(self):
#     # Get the listing_id from the URL parameters
#     listing_id = self.kwargs['listing_id']
    
#     # Retrieve all ListingImages associated with the given listing_id
#     queryset = ListingImage.objects.filter(listing_id=listing_id)
    
#     return queryset

# @api_view(['POST'])
# def listing_image(request, listing_id):
#   listing = get_object_or_404(Listing, listing_id=listing_id)

#   if request.method == 'POST':
#     data = request.data
#     # Ensure that the 'listing' field in the data is set to the correct listing object
#     data['listing'] = listing.id
#     serializer = ListingImageSerializer(data=data)
#     if serializer.is_valid():
#       serializer.save()
#       return Response({'Listing image created successfully!'})
#     return Response(serializer.errors, status=400)



class ListingImageCreateView(generics.CreateAPIView):
  def post(self, request, listing_id):
    try:
      # Get the Listing object with the provided listing_id
      listing = Listing.objects.get(pk=listing_id)
    except Listing.DoesNotExist:
      return Response(
        {'detail': 'Listing not found'},
        status=status.HTTP_404_NOT_FOUND
      )
    
    serializer = ListingImageSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save(listing=listing)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
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