from rest_framework import serializers

from .models import Asclepian, Group, Permission


class PermissionSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:

        model = Permission
        fields = ("codename",)

    def to_representation(self, instance):

        print(instance)
        print(type(instance))
        ret = super().to_representation(instance)
        print(ret)
        ret['codename'] = ret['codename'].upper()

        return ret


class GroupSerializer(serializers.HyperlinkedModelSerializer):

    permissions = PermissionSerializer(many = True)

    class Meta:

        model = Group
        fields = ("name", "permissions")


class AsclepianSerializer(serializers.HyperlinkedModelSerializer):

    groups = GroupSerializer(many = True)

    class Meta:

        model = Asclepian
        fields = ("username", "first_name", "last_name", "groups")