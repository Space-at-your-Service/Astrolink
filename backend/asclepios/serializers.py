from rest_framework import serializers

from .models import Asclepian, Group, Permission


class PermissionSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:

        model = Permission
        fields = ("codename", "name")

    def to_representation(self, instance):

        fullcodename = f"{instance.content_type.app_label}.{instance.codename}"
        name = instance.name

        return {"codename" : fullcodename, "name" : name}


class GroupSerializer(serializers.HyperlinkedModelSerializer):

    #permissions = PermissionSerializer(many = True)

    class Meta:

        model = Group
        fields = ("name",)# "permissions")


class AsclepianSerializer(serializers.HyperlinkedModelSerializer):

    groups = GroupSerializer(many = True)

    class Meta:

        model = Asclepian
        fields = ("username", "first_name", "last_name", "groups",)

    def to_representation(self, instance):

        rep = super().to_representation(instance)
        perms = instance.get_all_permissions()
        rep.update({"permissions" : list(perms)})

        return rep
