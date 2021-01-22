"""
asclepios > serializers
Defines various ways of
serializing the app's models
"""


from django.contrib.auth.models import Group, Permission

from rest_framework import serializers

from .models import Asclepian


class GroupSerializer(serializers.ModelSerializer):

    """ Group/Role Serializer 

        Returns a simplified representation of a Group/Role
        just in terms of its name and unit
    """

    class Meta:

        model = Group
        fields = ("name", "unit")


    def to_representation(self, instance):

        return {"role" : instance.name, "unit" : instance.unit.name}


class SimpleAsclepianSerializer(serializers.ModelSerializer):

    """ Asclepian Serializer 

        Returns a simplified representation of a User
        just in terms of its username, first name, last name, and groups/roles
    """

    groups = GroupSerializer(many = True)

    class Meta:

        model = Asclepian
        fields = ("username", "first_name", "last_name", "groups")


class AsclepianSerializer(serializers.ModelSerializer):

    """ Asclepian Serializer 

        Returns a full representation of a User
        with favorites procedures just as a title list
        and permissions as "codename : verbose name"
    """

    groups = GroupSerializer(many = True)

    class Meta:

        model = Asclepian
        fields = ("username", "first_name", "last_name", "groups")


    def to_representation(self, instance):

        rep = super().to_representation(instance)
        user_perms_codenames = [p.split('.')[1] for p in instance.get_all_permissions()]
        permissions = Permission.objects.filter(codename__in = user_perms_codenames)

        favorites = instance.favoriteProcedures.order_by("types__masterType", "types__subtype", "title")

        rep["permissions"] = {f"{p.content_type.app_label}.{p.codename}" : p.name for p in permissions}
        rep["favoriteProcedures"] = list(favorites.values_list("title", flat = True))

        return rep


class AsclepianFavoritesSerializer(serializers.ModelSerializer):

    """ Asclepian Serializer 

        Simply updates the favoriteProcedures field
    """

    class Meta:

        model = Asclepian
        fields = ("favoriteProcedures",)