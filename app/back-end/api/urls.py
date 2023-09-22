from django.urls import path
from . import views
from .views import MyTokenObtainPairView, ListingFilterView, ListingDetailView, ListingImageCreateView

from rest_framework_simplejwt.views import (
  # TokenObtainPairView,
  TokenRefreshView,
)

urlpatterns = [
  path('', views.getRoutes),
  path('users/', views.users, name='createUser-getUsers'),
  path('users/<str:USERNAME>/host', views.host_request, name='host_request'),
  path('users/<str:USERNAME>/avatar', views.avatar, name='avatar'),
  # path('users/<str:USERNAME>/', views.user, name='user-detail'),
  
  path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

  
  path('listing/', views.listing, name='listing'),
  path('listing/detail/<int:listing_id>', ListingDetailView.as_view(), name='listing'),
  path('listings/filter/', ListingFilterView.as_view(), name='listings'),

  path('listing_image/', ListingImageCreateView.as_view(), name='listing_image'),
  # path('listing_images/<int:listing_id>/', views.ListingImageListView.as_view(), name='listing-image-list')

]