from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate

@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user:
        return Response({
            "success": True,
            "username": user.username,
            "is_admin": user.is_superuser
        })
    else:
        return Response({
            "success": False,
            "message": "Invalid credentials"
        })