from rest_framework.views import APIView
from rest_framework import status

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.http.response import HttpResponse, JsonResponse

from .serializers import AsclepianSerializer, AsclepianFavoritesSerializer, SimpleAsclepianSerializer
from django.core.exceptions import ValidationError



class ProfileView(APIView):

    def get(self, request):

        ser = AsclepianSerializer(request.user)

        return JsonResponse(ser.data, safe = False)

    def put(self, request):

        rep = {}

        if "favoriteProcedures" in request.data:

            ser = AsclepianFavoritesSerializer(request.user, data = request.data)

            if ser.is_valid():

                ser.save()
                rep.update(ser.data)

            else:

                rep.update(ser.errors)

        if "oldPassword" in request.data and "newPassword" in request.data:

            if request.user.check_password(request.data["oldPassword"]):

                try:

                    validate_password(request.data["newPassword"], user = request.user)
                    request.user.set_password(request.data["newPassword"])
                    request.user.save()
                    rep.update({"password" : "successfully updated"})

                except ValidationError as e:
                    rep.update({"password" : e.messages})

            else:

                rep.update({"password" : "old password incorrect !"})

        if rep:

            return JsonResponse(rep, status = status.HTTP_202_ACCEPTED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)


class GroupView(APIView):

    def get(self, request, pk):

        users = get_user_model().objects.filter(groups__unit__name = pk)

        if users:

            ser = SimpleAsclepianSerializer(users, many = True)

            return JsonResponse(ser.data, status = status.HTTP_200_OK, safe = False)

        return HttpResponse(status = status.HTTP_204_NO_CONTENT)