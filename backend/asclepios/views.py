from rest_framework.views import APIView
from rest_framework import status

from django.http import JsonResponse

from .serializers import AsclepianSerializer, AsclepianFavoritesSerializer


class ProfileView(APIView):

    def get(self, request):

        ser = AsclepianSerializer(request.user)

        return JsonResponse(ser.data, safe = False)

    def post(self, request):

        request.user.check_perms(("asclepios.add_asclepian",))

        ser = AsclepianSerializer(data = request.data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_201_CREATED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)

    def put(self, request):

        rep = {}

        if "favoriteProcedures" in request.data:

            ser = AsclepianFavoritesSerializer(request.user, data = request.data)

            if ser.is_valid():

                ser.save()
                rep.update(ser.data)

        if "oldPassword" in request.data and "newPassword" in request.data:

            if request.user.check_password(request.data["oldPassword"]):

                request.user.set_password(request.data["newPassword"])
                rep.update({"password" : "successfully updated"})

            else:

                rep.update({"password" : "old password incorrect !"})

        if rep:

            return JsonResponse(rep, status = status.HTTP_202_ACCEPTED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)