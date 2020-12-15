from rest_framework.views import APIView
from django.http import JsonResponse

from .serializers import AsclepianSerializer


class GlobalView(APIView):

    def get(self, request):

        ser = AsclepianSerializer(request.user, context = {"request" : request})

        return JsonResponse(ser.data, safe = False)