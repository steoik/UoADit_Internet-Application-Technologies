from django.urls import path
from . import views
from .views import MyTokenObtainPairView

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
]