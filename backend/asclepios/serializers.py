from django.contrib.auth.models import Group, Permission

from rest_framework import serializers

from .models import Asclepian
from activities.serializers import ProcedureSerializer


class GroupSerializer(serializers.ModelSerializer):

    class Meta:

        model = Group
        fields = ("name",)

    def to_representation(self, instance):

        return instance.name


class SimpleAsclepianSerializer(serializers.ModelSerializer):

    class Meta:

        model = Asclepian
        fields = ("username", "first_name", "last_name")


class AsclepianSerializer(serializers.ModelSerializer):

    class Meta:

        model = Asclepian
        fields = ("username", "first_name", "last_name")


    def to_representation(self, instance):

        rep = super().to_representation(instance)
        perms = instance.get_all_permissions()
        rep["permissions"] = []

        for p in perms:

            perm = Permission.objects.filter(codename = p.split('.')[1]).get()
            rep["permissions"].append({f"{perm.content_type.app_label}.{perm.codename}" : perm.name})

        favorites = instance.favoriteProcedures.all().order_by("types__masterType", "types__subtype", "title")
        rep["favoriteProcedures"] = ProcedureSerializer(favorites, many = True).data

        return rep


class AsclepianFavoritesSerializer(serializers.ModelSerializer):

    class Meta:

        model = Asclepian
        fields = ("favoriteProcedures",)