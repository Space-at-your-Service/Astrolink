"""
activities > serializers
Defines various ways of
serializing the app's models
"""


from rest_framework import serializers

from .models import Procedure, ProcedureType, ProcedureSubtype, Task, Experiment, Textsheet
from django.contrib.auth import get_user_model
from asyncio import tasks


class ProcedureSubtypeSerializer(serializers.HyperlinkedModelSerializer):

    """ ProcedureSubtype Serializer

        Returns a simplified representation of a
        subtype just in terms of its name
    """

    class Meta:

        model = ProcedureSubtype
        fields = ("subtype",)

    def to_representation(self, instance):

        return instance.subtype


class ProcedureTypeSerializer(serializers.HyperlinkedModelSerializer):

    """ ProcedureType Serializer """

    subtypes = ProcedureSubtypeSerializer(many = True)

    class Meta:

        model = ProcedureType
        fields = ("type", "subtypes",)


class ProcedureSerializer(serializers.HyperlinkedModelSerializer):

    """ Procedure Serializer

        Wraps the subtype & type
        received into a ProcedureSubtype object before creation
    """

    type = serializers.CharField(max_length = 50)
    subtype = serializers.CharField(max_length = 50)

    class Meta:

        model = Procedure
        fields = ("title", "type", "subtype", "abstract", "pdfFile")


    def create(self, validated_data):

        pmt = ProcedureType.objects.get_or_create(type = validated_data.pop("type"))[0]

        pst = ProcedureSubtype.objects.get_or_create(subtype = validated_data.pop("subtype"), 
                                                     masterType = pmt)[0]

        validated_data.update({"types" : pst})

        return Procedure.objects.create(**validated_data)


    def to_representation(self, instance):

        rep = {"title" : instance.title,
               "type" : instance.types.masterType.type,
               "subtype" : instance.types.subtype,
               "abstract" : instance.abstract}

        return rep


class TaskSerializer(serializers.ModelSerializer):

    """ Task Serializer

        Fetches the holder user object and the 
        procedures objects before creation
    """

    holder = serializers.CharField(max_length = 150)

    class Meta:

        model = Task
        fields = ("title", "holder", "start", "end", "content", "category", "background", "allDay", "procedures")


    def create(self, validated_data):

        holder = get_user_model().objects.get(username = validated_data.pop("holder"))
        procedures = validated_data.pop("procedures")

        newtask = Task.objects.create(holder = holder, **validated_data)
        newtask.procedures.add(*procedures)

        return newtask


    def update(self, instance, validated_data):

        if "holder" in validated_data:
            validated_data["holder"] = get_user_model().objects.get(username = validated_data.pop("holder"))

        if "procedures" in validated_data:
            validated_data["procedures"] = Procedure.objects.filter(title__in = validated_data.pop("procedures"))

        return super().update(instance, validated_data)


    def to_representation(self, instance):

        self.fields["procedures"] = ProcedureSerializer(many = True)

        rep = serializers.ModelSerializer.to_representation(self, instance)
        rep["id"] = instance.id

        return rep


class TextsheetSerializer(serializers.ModelSerializer):

    """ Textsheet Serializer

        Constructs a clean representation containing creator and lastUser's usernames
    """

    class Meta:

        model = Textsheet
        fields = ("id", "title", "experiment", "creationDate", "lastModifiedDate", "creator", "lastUser", "content")


    def to_representation(self, instance):

        rep = super().to_representation(instance)
        rep["creator"] = instance.creator.username
        rep["lastUser"] = instance.lastUser.username

        return rep

class ExperimentSerializer(serializers.ModelSerializer):

    """ Experiment Serializer 

        Constructs a clean representation containing operators & supervisors usernames
    """

    class Meta:

        model = Experiment
        fields = ("title", "status", "abstract", "description", "operators", "supervisor", "procedures")


    def to_representation(self, instance):

        rep = {"title" : instance.title,
               "status" : instance.status,
               "abstract" : instance.abstract,
               "description" : instance.description,
               "operators" : list(instance.operators.all().values_list("username", flat = True)),
               "supervisor" : "" if not instance.supervisor else instance.supervisor.username,
               "procedures" : ProcedureSerializer(instance.procedures.all(), many = True).data}

        rep["data"] = {"textsheets" : TextsheetSerializer(instance.textsheets.all(), many = True).data,
                       "spreadsheets" : list(instance.spreadsheets.all().values_list("id", flat = True))} #TODO: Change once spreadsheets are implemented

        return rep