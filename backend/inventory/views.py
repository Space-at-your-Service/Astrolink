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

from .models import Item
from .serializers import ItemSerializer


log = logging.getLogger("requests")


class ItemsView(APIView):

    def get(self, request):

        """ GET inventory/

            Retrieves all the items inventoried
        """

        request.user.check_perms(("inventory.view_item",))
        log.info(f"{request.user} accessed GET inventory/")

        all_items = Item.objects.all().order_by("id")
        ser = ItemSerializer(all_items, many = True)

        return JsonResponse(ser.data, safe = False)

    def post(self, request):

        """ POST inventory/

            Adds a new item to the inventory
        """

        request.user.check_perms(("inventory.add_item",))
        log.info(f"{request.user} accessed POST inventory/")

        item_data = JSONParser().parse(request)
        ser = ItemSerializer(data = item_data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_201_CREATED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)


class ItemView(APIView):

    def put(self, request, pk):

        """ PUT inventory/<item_id>

            Edits a given item
        """

        request.user.check_perms(("inventory.change_item",))
        log.info(f"{request.user} accessed PUT inventory/{pk}/")

        item = Item.objects.get(pk = pk)

        item_data = JSONParser().parse(request)
        ser = ItemSerializer(item, data = item_data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):

        """ DELETE inventory/<item_id>

            Deletes a given item
        """

        request.user.check_perms(("inventory.delete_item",))
        log.info(f"{request.user} accessed DELETE inventory/{pk}/")

        item = Item.objects.get(pk = pk)
        item.delete()

        return JsonResponse({"message" : "Item was deleted successfully"}, status = status.HTTP_204_NO_CONTENT)