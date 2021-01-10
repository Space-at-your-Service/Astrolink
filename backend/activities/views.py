from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from wsgiref.util import FileWrapper
from django.contrib.auth import get_user_model

from .models import Procedure, ProcedureType, Task, Experiment
from .serializers import ProcedureSerializer, ProcedureTypeSerializer, TaskSerializer, ExperimentSerializer


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

        return HttpResponse("Upload successful", status = status.HTTP_202_ACCEPTED)

    def delete(self, request, pk):

        request.user.check_perms(("activities.delete_procedure",))

        procedure = Procedure.objects.get(pk = pk)
        procedure.delete()

        return HttpResponse("Delete successful", status = status.HTTP_204_NO_CONTENT)


class ProcedureTypesView(APIView):

    def get(self, request):

        request.user.check_perms(("activities.view_proceduresubtype",))

        alltypes = ProcedureType.objects.all()

        ser = ProcedureTypeSerializer(alltypes, many = True, context = {"request" : request})

        return JsonResponse(ser.data, safe = False)


class PlanningView(APIView):

    def get(self, request):

        planning = Task.objects.filter(holder = request.user)

        if not planning:

            return HttpResponse("This user has nothing to do !", status = status.HTTP_204_NO_CONTENT)

        ser = TaskSerializer(planning, many = True)

        return JsonResponse(ser.data, safe = False)

    def post(self, request):

        request.user.check_perms(("activities.add_task",))

        ser = TaskSerializer(data = request.data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_201_CREATED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)


class FlightplanView(APIView):

    def get(self, request):

        #TODO: add permission

        astronauts = get_user_model().objects.filter(groups__name = "Astronauts") #TODO : don't hardcode this

        fp = {}
        for a in astronauts:

            ser = TaskSerializer(Task.objects.filter(holder = a), many = True)
            fp.update({a.username : ser.data})

        return JsonResponse(fp, status = status.HTTP_200_OK)


class ExperimentsView(APIView):

    def get(self, request):

        request.user.check_perms(("activities.view_experiment",))

        all_experiments = Experiment.objects.all()
        ser = ExperimentSerializer(all_experiments, many = True)

        return JsonResponse(ser.data, safe = False)