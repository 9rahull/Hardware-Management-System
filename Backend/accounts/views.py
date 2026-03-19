from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate

@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({
            "success": True,
            "message": "Login successful"
        })
    else:
        return Response({
            "success": False,
            "message": "Invalid credentials"
        })