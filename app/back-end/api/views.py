from rest_framework.response import Response
from rest_framework.decorators import api_view
# from django.shortcuts import get_object_or_404

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# from .models import User
# from .serializers import UserSerializer

# @api_view(['GET', 'DELETE'])
# def user(request, USERNAME):
#   # Get a User
#   if request.method == 'GET':
#     try:
#       user = User.objects.get(user_name=USERNAME)
#       serializer = UserSerializer(user, many=False)
#       return Response(serializer.data)
#     except User.DoesNotExist:
#         return Response({'Error': 'User not found'}, status=404)
#   # Delete a User
#   if request.method == 'DELETE':
#     if USERNAME is None:
#       return Response({'Error': 'User ID is required for deletion'}, status=400)
#     try:
#       user = User.objects.get(user_name=USERNAME)
#       user.delete()
#       return Response({'User deleted successfully'})
#     except User.DoesNotExist:
#       return Response({'Error': 'User not found'}, status=404)

# @api_view(['POST', 'GET'])
# def users(request):
#   # Create a new User
#   if request.method == 'POST':
#     data = request.data
#     user = User.objects.create(
#       user_name=data.get('user_name', ''),
#       password=data.get('password', ''),
#       first_name=data.get('first_name', ''),
#       last_name=data.get('last_name', ''),
#       email=data.get('email', ''),
#       phone=data.get('phone', ''),
#       profile_picture=data.get('profile_picture', None)
#     )

#     serializer = UserSerializer(user, many=False)
#     return Response(serializer.data)
#   # Get all Users
#   if request.method == 'GET':
#     users = User.objects.all()
#     serializer = UserSerializer(users, many=True)
#     return Response(serializer.data)

# @api_view(['POST', 'GET', 'DELETE'])
# def userProfile(request, USERNAME):
#   user = get_object_or_404(User, user_name=USERNAME)
#   # Update User profile picture
#   if request.method == 'POST':
#     data = request.data
#     user = User.objects.get(user_name=USERNAME)
#     user.profile_picture = data.get('profile_picture')
#     user.save()
#     return Response({'User profile picture updated'})
  # Get the User profile picture
  # Delete the User profile picture

@api_view(['GET'])
def getRoutes(request):
 routes = [
   'token',
   'token/refresh',
 ]

 return Response(routes)

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