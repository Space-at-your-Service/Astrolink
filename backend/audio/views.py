"""
asclepios > views
Defines all of the app's
REST Endpoints
"""


import logging
from rest_framework.parsers import MultiPartParser, FormParser

from django.http import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from .models import Audio
from .serializers import AudioSerializer
import time
log = logging.getLogger("requests")

 

class AudiosView(APIView):

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

    def put(self, request, id):

        """ PUT audio/<room_id>

            Edits a given room
        """
        if('base' in request.data['rooms'].split(',')):
            #add timeout for the delay
            time.sleep(7)
        audio = Audio.objects.get(id = id)
        print(request.data)
        request.data.pop('audiofile')
        print(request.data)
        audio_data = request.data
        ser = AudioSerializer(audio, data = audio_data, partial=True)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)



class AudioView(APIView):

    parser_classes = (MultiPartParser,)

    def get(self, request, pk):

        """ GET activities/procedure/<procedure_title>

            Gets a specific procedure's pdf
        """

        log.info(f"{request.user} accessed GET activities/procedure/{pk}/")

        audio = Audio.objects.get(pk = pk)

        return HttpResponse(FileWrapper(audio.audioFile), content_type = "audio/wav")

