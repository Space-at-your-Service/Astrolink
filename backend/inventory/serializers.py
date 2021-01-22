"""
inventory > serializers
Defines various ways of
serializing the app's models
"""


from rest_framework import serializers

from .models import Item


class ItemSerializer(serializers.HyperlinkedModelSerializer):

    """ Item Serializer """

    class Meta:

        model = Item
        fields = ("id", "name", "details", "quantity")