"""
audio > views
Defines all of the app's
REST Endpoints
"""


import logging
from wsgiref.util import FileWrapper
from threading import Thread


from rest_framework.parsers import MultiPartParser, FormParser
from django.http import HttpResponse

from django.http import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from django.http import HttpResponse

from .models import Audio
from .serializers import AudioSerializer
import time
log = logging.getLogger("requests")

 

class AudiosView(APIView):

    def get(self, request):

        """ GET audio/

            Retrieves all the audios
        """

        request.user.check_perms(("communication.view_communication",))
        log.info(f"{request.user} accessed GET audio/")

        all_audios = Audio.objects.all().order_by("timestamp")
        ser = AudioSerializer(all_audios, many = True)
        return JsonResponse(ser.data, safe = False)

    



class AudioView(APIView):


    def get(self, request, id):

        """ GET audio/id

            Gets a specific audio
        """

        request.user.check_perms(("communication.view_communication",))
        log.info(f"{request.user} accessed GET audio/{id}")

        audio = Audio.objects.get(id = id)

        return HttpResponse(FileWrapper(audio.audiofile), content_type = "audio/mp3")

    def put(self, request, id, posting=False):
        """ PUT audio/id
        Modifies a specific audio. posting boolean is true if and only if and audio has been sent in 
        the base room. It will then add the base room to the rooms list of the audio.

        """
        if posting:
            time.sleep(8)
            withBase = request.data['rooms'].split(',')
            withBase.append('base')
            request.data['rooms'] = (',').join(withBase)
        audio = Audio.objects.get(id = id)
        request.data.pop('audiofile')
        audio_data = request.data
        ser = AudioSerializer(audio, data = audio_data, partial=True)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)

    def post(self, request,id):
        """ POST audio/id
            post an audio
        """
        request.user.check_perms(("communication.view_communication",))
        log.info(f"{request.user} accessed POST audio/{id}")

        if('base' in request.data['rooms'].split(',')):
            noBase = request.data['rooms'].split(',')
            noBase.remove('base')
            request.data['rooms'] = (',').join(noBase) 
            print("Begin Thread")
            Thread(target=self.put, args=(request, id, True,)).start()

        audio_data = request.data
        ser = AudioSerializer( data = audio_data)

        if ser.is_valid():
            ser.save()
            return JsonResponse(ser.data)
        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)

