from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import User
from .serializers import UserSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
  return Response("Our API")

@api_view(['GET'])
def getUsers(request):
  users = User.objects.all()
  serializer = UserSerializer(users, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def getUser(request, un):
  users = User.objects.get(user_name=un)
  serializer = UserSerializer(users, many=False)
  return Response(serializer.data)

@api_view(['POST'])
def createUser(request):
  data = request.data
  user = User.objects.create(
    user_name = data['user_name'],
    password = data['password']
  )
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)

@api_view(['DELETE'])
def deleteUser(request, un):
  user = User.objects.get(user_name=un)
  user.delete()
  return Response('User was deleted!')