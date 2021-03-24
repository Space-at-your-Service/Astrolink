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

from .models import Room
from .serializers import RoomSerializer

log = logging.getLogger("requests")



class CommunicationView(APIView):

    def get(self, request):

        """ GET rooms/

            Retrieves all the lists of users rooms
        """

        request.user.check_perms(("inventory.view_communication",))
        log.info(f"{request.user} accessed GET communication/")

        all_rooms = Room.objects.all().order_by("name")
        ser = RoomSerializer(all_rooms, many = True)
        return JsonResponse(rooms, safe = False)

    def put(self, request, pk):

        """ PUT room/<room_name>

            Edits a room users
        """
        request.user.check_perms(("communication.join_room",))
        log.info(f"{request.user} accessed POST rooms/")
        room = Room.objects.get(pk = pk)
        room_data = JSONParser().parse(request)
        ser = RoomSerializer(data = room_data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_201_CREATED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)

