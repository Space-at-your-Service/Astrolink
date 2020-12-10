from rest_framework import serializers

from .models import Procedure


class ProcedureSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:

        model = Procedure
        fields = ("nick", "title", "type", "abstract", "pdfFile")