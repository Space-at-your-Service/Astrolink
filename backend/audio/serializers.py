"""
Communication > serializers
Defines various ways of
serializing the app's models
"""


from rest_framework import serializers

from .models import Audio


class AudioSerializer(serializers.HyperlinkedModelSerializer):

    """ Item Serializer """

    class Meta:

        model = Audio
        fields = ("id","user", "rooms","audiofile","timestamp")