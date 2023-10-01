from django.urls import path
from . import views
from .views import MyTokenObtainPairView, ListingFilterView, ListingDetailView, ListingImageCreateView, ListingImageListView, ListingImagePrimaryView
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
  # TokenObtainPairView,
  TokenRefreshView,
)

urlpatterns = [
  path('', views.getRoutes),
  path('users/', views.users, name='createUser-getUsers'),
  path('users/<str:USERNAME>', views.userDetail, name='getUser'),
  path('users/<str:USERNAME>/host', views.host_request, name='host_request'),
  path('users/<str:USERNAME>/avatar', views.avatar, name='avatar'),
  
  path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

  path('listing', views.listing, name='listing'),
  path('listing/detail/<int:listing_id>', ListingDetailView.as_view(), name='listing'),
  path('listing/filter', ListingFilterView.as_view(), name='listings'),

  path('listing/image/create/<int:listing_id>', ListingImageCreateView.as_view(), name='listing_image'),
  path('listing/image/primary/<int:listing_id>', ListingImagePrimaryView.as_view(), name='listing_image'),
  path('listing/image/list/<int:listing_id>', ListingImageListView.as_view(), name='listing_image'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)