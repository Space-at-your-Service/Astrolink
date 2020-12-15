from django.http import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from .models import Item
from .serializers import ItemSerializer


class GlobalView(APIView):

    def get(self, request):

        request.user.check_perms(("inventory.view_item",))

        all_items = Item.objects.all().order_by("id")
        ser = ItemSerializer(all_items, many = True)

        return JsonResponse(ser.data, safe = False)

    def post(self, request):

        request.user.check_perms(("inventory.add_item",))

        item_data = JSONParser().parse(request)
        ser = ItemSerializer(data = item_data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_201_CREATED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)


class SelectiveView(APIView):

    def put(self, request, pk):

        request.user.check_perms(("inventory.change_item",))

        item = Item.objects.get(pk = pk)

        item_data = JSONParser().parse(request)
        ser = ItemSerializer(item, data = item_data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):

        request.user.check_perms(("inventory.delete_item",))

        item = Item.objects.get(pk = pk)

        item.delete()
        return JsonResponse({"message" : "Item was deleted successfully"}, status = status.HTTP_204_NO_CONTENT)