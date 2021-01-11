from django.contrib.auth.models import Group, Permission

from rest_framework import serializers

from .models import Asclepian


class GroupSerializer(serializers.ModelSerializer):

    class Meta:

        model = Group
        fields = ("name",)

    def to_representation(self, instance):

        return instance.name


class AsclepianSerializer(serializers.ModelSerializer):

    class Meta:

        model = Asclepian
        fields = ("username", "first_name", "last_name", "password")


    def create(self, validated_data):

        new_user = Asclepian.objects.create_user(username = validated_data["username"], password = validated_data["password"])
        new_user.first_name = validated_data["first_name"]
        new_user.last_name = validated_data["last_name"]

        return new_user

    def to_representation(self, instance):

        rep = super().to_representation(instance)
        perms = instance.get_all_permissions()
        rep["permissions"] = []

        for p in perms:

            perm = Permission.objects.filter(codename = p.split('.')[1]).get()
            rep["permissions"].append({f"{perm.content_type.app_label}.{perm.codename}" : perm.name})

        favorites = instance.favoriteProcedures.all().order_by("types__masterType", "types__subtype", "title")
        rep["favoriteProcedures"] = list(favorites.values_list("nick", flat = True))

        del rep["password"]

        return rep


class AsclepianFavoritesSerializer(serializers.ModelSerializer):

    class Meta:

        model = Asclepian
        fields = ("favoriteProcedures",)