"""
asclepios > views
Defines all of the app's
REST Endpoints
"""


import logging

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.http.response import HttpResponse, JsonResponse

from rest_framework import status
from rest_framework.views import APIView

from .serializers import AsclepianSerializer, AsclepianFavoritesSerializer, SimpleAsclepianSerializer


log = logging.getLogger("requests")


class ProfileView(APIView):

    def get(self, request):

        """ GET asclepios/profile/

            Retrieves a user's profile
        """

        log.info(f"{request.user} accessed GET asclepios/profile/")

        ser = AsclepianSerializer(request.user)

        return JsonResponse(ser.data, safe = False)

    def put(self, request):

        """ PUT asclepios/profile/

            Edits a user's profile (favorites only for now)
        """

        log.info(f"{request.user} accessed PUT asclepios/profile/")

        ser = AsclepianFavoritesSerializer(request.user, data = request.data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_202_ACCEPTED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)



class PasswordView(APIView):

    def put(self, request):

        """ PUT asclepios/password/

            Edits a user's password
        """

        log.info(f"{request.user} accessed PUT asclepios/password/")

        if "oldPassword" in request.data and "newPassword" in request.data:

            if request.user.check_password(request.data["oldPassword"]):

                try:

                    validate_password(request.data["newPassword"], user = request.user)
                    request.user.set_password(request.data["newPassword"])
                    request.user.save()

                    return HttpResponse("Password was successfully updated", status = status.HTTP_202_ACCEPTED)

                except ValidationError as e:

                    return JsonResponse(e.messages, status = status.HTTP_400_BAD_REQUEST)

            return HttpResponse("Old password incorrect", status = status.HTTP_400_BAD_REQUEST)

        return HttpResponse("Missing fields", status = status.HTTP_400_BAD_REQUEST)


class UnitsView(APIView):

    def get(self, request, pk):

        """ GET asclepios/unit/<unit_name>

            Gets all the usernames in a given unit
        """

        log.info(f"{request.user} accessed GET asclepios/units/{pk}/")

        users = get_user_model().objects.filter(groups__unit__name = pk)

        if users:

            ser = SimpleAsclepianSerializer(users, many = True)

            return JsonResponse(ser.data, status = status.HTTP_200_OK, safe = False)

        return HttpResponse(status = status.HTTP_204_NO_CONTENT)