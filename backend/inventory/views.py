from django.http import JsonResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from asclepios.permissions import IsAstronaut, IsMCC, per_method

from .models import Item
from .serializers import ItemSerializer



class GlobalView(APIView):

    @per_method({"GET" : IsAstronaut | IsMCC, "POST" : IsAstronaut})
    def get_permissions(self):
        pass

    def get(self, request):

        all_items = Item.objects.all().order_by("id")
        ser = ItemSerializer(all_items, many = True)

        return JsonResponse(ser.data, safe = False)

    def post(self, request):

        item_data = JSONParser().parse(request)
        ser = ItemSerializer(data = item_data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_201_CREATED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)


class SelectiveView(APIView):

    @per_method({"PUT" : IsAstronaut | IsMCC, "DELETE" : IsAstronaut})
    def get_permissions(self):
        pass

    def put(self, request, pk):

        item = Item.objects.get(pk = pk)

        item_data = JSONParser().parse(request)
        ser = ItemSerializer(item, data = item_data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):

        item = Item.objects.get(pk = pk)

        item.delete()
        return JsonResponse({"message" : "Item was deleted successfully"}, status = status.HTTP_204_NO_CONTENT)