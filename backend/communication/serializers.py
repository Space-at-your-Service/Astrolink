"""
Communication > serializers
Defines various ways of
serializing the app's models
"""


from rest_framework import serializers

from .models import Room


class RoomSerializer(serializers.HyperlinkedModelSerializer):

    """ Item Serializer """

    class Meta:

        model = Room
        fields = ("name", "users")