from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('users/', views.getUsers, name="users"),
    path('users/create', views.createUser, name="create-user"),
    path('users/<str:un>', views.getUser, name="user"),
    path('users/<str:un>/delete', views.deleteUser, name="delete-user")
]