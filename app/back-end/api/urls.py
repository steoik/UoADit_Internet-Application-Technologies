from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.users, name='user-list'),
    path('users/<str:USERNAME>/', views.user, name='user-detail'),
]