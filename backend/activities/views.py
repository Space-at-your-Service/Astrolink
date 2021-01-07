from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from wsgiref.util import FileWrapper

from .models import Procedure, ProcedureType, ProcedureSubtype
from .serializers import ProcedureSerializer, ProcedureTypeSerializer, ProcedureSubtypeSerializer


class ProceduresView(APIView):

    parser_classes = (MultiPartParser, FormParser,)

    def get(self, request):

        request.user.check_perms(("activities.view_procedure",))

        all_procedures = Procedure.objects.all()
        ser = ProcedureSerializer(all_procedures, context = {"request" : request}, many = True)

        return JsonResponse(ser.data, safe = False)

    def post(self, request):

        request.user.check_perms(("activities.add_procedure",))

        ser = ProcedureSerializer(data = request.data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_201_CREATED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)


class ProcedureView(APIView):

    parser_classes = (MultiPartParser,)

    def get(self, request, pk):

        request.user.check_perms(("activities.view_procedure",))

        procedure = Procedure.objects.get(pk = pk)

        return HttpResponse(FileWrapper(procedure.pdfFile), content_type = "application/pdf")

    def put(self, request, pk):

        request.user.check_perms(("activities.change_procedure",))

        procedure = Procedure.objects.get(pk = pk)

        f = request.data["pdfFile"]

        procedure.pdfFile.save(f.name, f, save = True)

        return JsonResponse({"message" : "Upload was done successfully"}, status = status.HTTP_202_ACCEPTED)

    def delete(self, request, pk):

        request.user.check_perms(("activities.delete_procedure",))

        procedure = Procedure.objects.get(pk = pk)
        procedure.delete()

        return JsonResponse({"message" : "Item was deleted successfully"}, status = status.HTTP_204_NO_CONTENT)


class ProcedureSubtypeView(APIView):

    def get(self, request):

        request.user.check_perms(("activities.view_proceduresubtype",))

        alltypes = ProcedureType.objects.all()

        ser = ProcedureTypeSerializer(alltypes, many = True, context = {"request" : request})

        return JsonResponse(ser.data, safe = False)