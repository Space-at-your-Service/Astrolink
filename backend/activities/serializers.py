from rest_framework import serializers

from .models import Procedure, ProcedureType, ProcedureSubtype


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

    types = ProcedureSubtypeSerializer()

    class Meta:

        model = Procedure
        fields = ("nick", "title", "types", "abstract", "pdfFile")