from rest_framework.views import APIView
from django.http import JsonResponse
from django.contrib.auth.models import Permission

from .serializers import AsclepianSerializer, PermissionSerializer


class UserView(APIView):

    def get(self, request):

        ser = AsclepianSerializer(request.user, context = {"request" : request})

        return JsonResponse(ser.data, safe = False)


class PermiView(APIView):

    def get(self, request):

        all_perms = Permission.objects.all()
        ser = PermissionSerializer(all_perms, context = {"request" : request}, many = True)

        return JsonResponse(ser.data, safe = False)