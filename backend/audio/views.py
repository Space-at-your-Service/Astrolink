"""
asclepios > views
Defines all of the app's
REST Endpoints
"""


import logging

from django.http import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from .models import Audio
from .serializers import AudioSerializer

log = logging.getLogger("requests")

 

class AudioView(APIView):

    def get(self, request):

        """ GET rooms/

            Retrieves all the lists of users rooms
        """

        #request.user.check_perms(("communication.view_communication",))
        #log.info(f"{request.user} accessed GET communication/")

        all_audios = Audio.objects.all().order_by("timestamp")
        ser = AudioSerializer(all_audios, many = True)
        return JsonResponse(ser.data, safe = False)

    def post(self, request):

       
        log.info(f"{request.user} accessed POST audio/")


        ser = AudioSerializer(data = request.data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)


