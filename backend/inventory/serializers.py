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

    def update(self, instance, validated_data):

        if "quantity" in validated_data and instance.quantity != validated_data["quantity"]:
            self.context["request"].user.check_perms("inventory.modify_item_qty")

        return super().update(instance, validated_data)