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

        usr = self.context["request"].user

        if usr.has_perm("inventory.change_item"):
            return super().update(instance, validated_data)

        elif "quantity" in validated_data and instance.quantity != validated_data["quantity"]:

            usr.check_perms("inventory.modify_item_qty")
            return super().update(instance, {"quantity" : validated_data["quantity"]})