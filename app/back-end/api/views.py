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