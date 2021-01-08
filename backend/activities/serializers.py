from rest_framework import serializers

from .models import Procedure, ProcedureType, ProcedureSubtype, Planning, Task
from django.contrib.auth import get_user_model


class SimpleProcedureSubtypeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:

        model = ProcedureSubtype
        fields = ("subtype",)

    def to_representation(self, instance):

        return instance.subtype


class SimpleProcedureTypeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:

        model = ProcedureType
        fields = ("type",)

    def to_representation(self, instance):

        return instance.type


class ProcedureTypeSerializer(serializers.HyperlinkedModelSerializer):

    subtypes = SimpleProcedureSubtypeSerializer(many = True)

    class Meta:

        model = ProcedureType
        fields = ("type", "subtypes",)


class ProcedureSubtypeSerializer(serializers.HyperlinkedModelSerializer):

    masterType = SimpleProcedureTypeSerializer()

    class Meta:

        model = ProcedureSubtype
        fields = ("subtype", "masterType")


class ProcedureSerializer(serializers.HyperlinkedModelSerializer):

    type = serializers.CharField(max_length = 50)
    subtype = serializers.CharField(max_length = 50)

    class Meta:

        model = Procedure
        fields = ("nick", "title", "type", "subtype", "abstract", "pdfFile")


    def create(self, validated_data):

        pmt = ProcedureType.objects.get_or_create(type = validated_data.pop("type"))[0]

        pst = ProcedureSubtype.objects.get_or_create(subtype = validated_data.pop("subtype"), 
                                                     masterType = pmt)[0]

        validated_data.update({"types" : pst})

        return Procedure.objects.create(**validated_data)


    def to_representation(self, instance):

        rep = {"nick" : instance.nick,
               "title" : instance.title,
               "type" : instance.types.masterType.type,
               "subtype" : instance.types.subtype,
               "abstract" : instance.abstract}

        return rep


class TaskSerializer(serializers.HyperlinkedModelSerializer):

    procedures = ProcedureSerializer(many = True)

    class Meta:

        model = Task
        fields = ("procedures", "start", "end", "title", "content", "category", "background", "allDay")


class PlanningSerializer(serializers.HyperlinkedModelSerializer):

    holder = serializers.CharField(max_length = 150)
    tasks = TaskSerializer(many = True)

    class Meta:

        model = Planning
        fields = ("holder", "tasks")


    def create(self, validated_data):

        holder = get_user_model().objects.get(username = validated_data["holder"])

        return Planning.objects.create(holder = holder)