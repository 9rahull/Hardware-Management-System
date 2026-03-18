from django.http import JsonResponse
from django.contrib.auth import authenticate
import json
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            return JsonResponse({
                "message": "Login successful"
            })
        else:
            return JsonResponse({
                "error": "Invalid username or password"
            }, status=400)