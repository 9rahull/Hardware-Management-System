from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def login_view(request):

    if request.method == "POST":

        try:
            data = json.loads(request.body)
        except:
            return JsonResponse({"error": "Invalid data"}, status=400)

        username = data.get("username")
        password = data.get("password")

        print(username, password)   # for debugging

        user = authenticate(username=username, password=password)

        if user is not None:
            return JsonResponse({"message": "Login successful"})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)

    return JsonResponse({"error": "POST request required"}, status=400)