from rest_framework import serializers

from .models import Procedure, ProcedureType, ProcedureSubtype, Task, Experiment, Textsheet
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


    def to_representation(self, instance):

        self.fields["procedures"] = ProcedureSerializer(many = True)

        return serializers.ModelSerializer.to_representation(self, instance)


class TextsheetSerializer(serializers.ModelSerializer):

    creator = serializers.CharField(max_length = 150)
    lastUser = serializers.CharField(max_length = 150)

    class Meta:

        model = Textsheet
        fields = ("title", "experiment", "creationDate", "lastModifiedDate", "creator", "lastUser", "content")


    def create(self, validated_data):

        creator = get_user_model().objects.get(username = validated_data.pop("creator"))
        lastUser = get_user_model().objects.get(username = validated_data.pop("lastUser"))

        return Textsheet.objects.create(creator = creator, lastUser = lastUser, **validated_data)


class ExperimentSerializer(serializers.ModelSerializer):

    operators = serializers.ListField(child = serializers.CharField(max_length = 150))
    supervisor = serializers.CharField(max_length = 150)

    class Meta:

        model = Experiment
        fields = ("title", "status", "abstract", "description", "operators", "supervisor", "procedures")


    def create(self, validated_data):

        operators = get_user_model().objects.filter(username__in = validated_data.pop("operators"))
        supervisor = get_user_model().objects.get(username = validated_data.pop("supervisor"))
        procedures = Procedure.objects.filter(title__in = validated_data.pop("procedures"))

        new_experiment = Experiment.objects.create(supervisor = supervisor, **validated_data)

        new_experiment.operators.add(*operators)
        new_experiment.procedures.add(*procedures)

        return new_experiment

    def to_representation(self, instance):

        rep = {"title" : instance.title,
               "status" : instance.status,
               "abstract" : instance.abstract,
               "description" : instance.description,
               "operators" : list(instance.operators.all().values_list("username", flat = True)),
               "supervisor" : instance.supervisor.username,
               "procedures" : list(instance.procedures.all())}

        rep["data"] = {"textsheets" : TextsheetSerializer(instance.textsheets.all(), many = True).data,
                       "spreadsheets" : list(instance.spreadsheets.all())}

        return rep