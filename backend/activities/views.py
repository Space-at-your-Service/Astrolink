"""
activities > views
Defines all of the app's
REST Endpoints
"""


import logging

from wsgiref.util import FileWrapper

from django.contrib.auth import get_user_model
from django.http import JsonResponse, HttpResponse
from django.utils import timezone

from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView

from .models import Procedure, ProcedureType, Task, Experiment, Textsheet
from .serializers import ProcedureSerializer, ProcedureTypeSerializer, TaskSerializer, ExperimentSerializer, TextsheetSerializer


log = logging.getLogger("requests")


class ProceduresView(APIView):

    parser_classes = (MultiPartParser, FormParser,)

    def get(self, request):

        """ GET activities/procedures/

            Retrieves the list of all procedures
        """

        request.user.check_perms(("activities.view_procedure",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        all_procedures = Procedure.objects.all()
        ser = ProcedureSerializer(all_procedures, context = {"request" : request}, many = True)

        return JsonResponse(ser.data, safe = False) #TODO: test with true

    def post(self, request):

        """ POST activities/procedures/

            Adds a new procedure
        """

        request.user.check_perms(("activities.add_procedure",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        ser = ProcedureSerializer(data = request.data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_201_CREATED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)


class ProcedureView(APIView):

    parser_classes = (MultiPartParser,)

    def get(self, request, pk):

        """ GET activities/procedure/<procedure_title>

            Gets a specific procedure's pdf
        """

        request.user.check_perms(("activities.view_procedure",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        procedure = Procedure.objects.get(pk = pk)

        return HttpResponse(FileWrapper(procedure.pdfFile), content_type = "application/pdf")

    def put(self, request, pk):

        """ PUT activities/procedure/<procedure_title>

            Edits a specific procedure's pdf
        """

        request.user.check_perms(("activities.change_procedure",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        procedure = Procedure.objects.get(pk = pk)
        #TODO : DELETE THE OLD FILE, otherwise we accumulate them
        f = request.data["pdfFile"]

        procedure.pdfFile.save(f.name, f, save = True)

        return HttpResponse("Upload successful", status = status.HTTP_202_ACCEPTED)

    def delete(self, request, pk):

        """ DELETE activities/procedures/<procedure_title>

            Deletes a specific procedure
        """

        request.user.check_perms(("activities.delete_procedure",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        procedure = Procedure.objects.get(pk = pk)
        procedure.delete()

        return HttpResponse("Delete successful", status = status.HTTP_204_NO_CONTENT)


class ProcedureTypesView(APIView):

    def get(self, request):

        """ GET activities/procedure_types/

            Retrieves the list of all procedure types and subtypes
        """

        request.user.check_perms(("activities.view_proceduretype",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        alltypes = ProcedureType.objects.all()

        ser = ProcedureTypeSerializer(alltypes, many = True, context = {"request" : request})

        return JsonResponse(ser.data, safe = False)


class PlanningView(APIView):

    def get(self, request):

        """ GET activities/planning/

            Retrieves the planning of the user requesting
        """

        request.user.check_perms(("activities.view_task",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        planning = Task.objects.filter(holder = request.user)

        if not planning:

            return HttpResponse("This user has nothing to do !", status = status.HTTP_204_NO_CONTENT)

        ser = TaskSerializer(planning, many = True)

        return JsonResponse(ser.data, safe = False)

    def post(self, request):

        """ POST activities/planning/

            Adds a new task in a given user's planning
        """

        request.user.check_perms(("activities.add_task",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        ser = TaskSerializer(data = request.data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_201_CREATED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)


class TaskView(APIView):

    def get(self, request, pk):

        """ GET activities/tasks/<id>/ """

        request.user.check_perms(("activities.view_task"))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        tsk = Task.objects.get(pk = pk)

        ser = TaskSerializer(tsk)

        return JsonResponse(ser.data)

    def put(self, request, pk):

        """ PUT activities/tasks/<id>/ """

        request.user.check_perms(("activities.change_task",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        tsk = Task.objects.get(pk = pk)

        ser = TaskSerializer(tsk, data = request.data, context = {"request" : request}, partial = True)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_202_ACCEPTED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):

        """ DELETE activities/tasks/<id>/ """

        request.user.check_perms(("activities.delete_task",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        tsk = Task.objects.get(pk = pk)

        tsk.delete()

        return HttpResponse("Delete successful", status = status.HTTP_204_NO_CONTENT)

class FlightplanView(APIView):

    def get(self, request):

        """ GET activities/flightplan/

            Gets the astronauts' planning, a.k.a flightplan
        """

        #TODO: add permission

        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        astronauts = get_user_model().objects.filter(groups__unit__name = "Astronauts") #TODO : don't hardcode this, create method get_astronauts under asclepian for instance
        ser = TaskSerializer(Task.objects.filter(holder__in = astronauts), many = True)

        return JsonResponse(ser.data, status = status.HTTP_200_OK, safe = False)


class PlanningsView(APIView):

    def get(self, request):

        """ GET activities/plannings/ """

        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        mcc = get_user_model().objects.filter(groups__unit__name = "MCC") #TODO : merge this with above method
        ser = TaskSerializer(Task.objects.filter(holder__in = mcc), many = True)

        return JsonResponse(ser.data, status = status.HTTP_200_OK, safe = False)


def inflate_experiment(requestdata):

    if "supervisor" in requestdata and requestdata["supervisor"]:

        new_supervisor = get_user_model().objects.get(username = requestdata.pop("supervisor"))
        if new_supervisor:
            requestdata["supervisor"] = new_supervisor.pk

    if "operators" in requestdata and requestdata["operators"]:

        new_operators = get_user_model().objects.filter(username__in = requestdata.pop("operators"))
        if new_operators:
            requestdata["operators"] = list(new_operators.values_list("pk", flat = True))

    if "procedures" in requestdata and requestdata["procedures"]:

        new_procedures = Procedure.objects.filter(title__in = requestdata.pop("procedures"))
        if new_procedures:
            requestdata["procedures"] = list(new_procedures.values_list("pk", flat = True))

class ExperimentsView(APIView):

    def get(self, request):

        """ GET activities/experiments/

            Retrieves all the experiments
        """

        request.user.check_perms(("activities.view_experiment",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        all_experiments = Experiment.objects.all()
        ser = ExperimentSerializer(all_experiments, many = True)

        return JsonResponse(ser.data, safe = False)


    def post(self, request):

        """ POST activities/experiments/

            Adds a new experiment
        """

        request.user.check_perms(("activities.add_experiment",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        inflate_experiment(request.data)

        ser = ExperimentSerializer(data = request.data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_201_CREATED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)


class ExperimentView(APIView):

    def put(self, request, pk):

        """ PUT activities/experiments/<experiment_title>

            Edits an experiment
        """

        request.user.check_perms(("activities.change_experiment",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        inflate_experiment(request.data)

        experiment = Experiment.objects.get(pk = pk)
        ser = ExperimentSerializer(instance = experiment, data = request.data, partial = True)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_202_ACCEPTED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):

        """ DELETE activities/experiments/<experiment_title>

            Deletes an experiment
        """

        request.user.check_perms(("activities.delete_experiment",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        experiment = Experiment.objects.get(pk = pk)
        experiment.delete()

        return HttpResponse("Delete successful", status = status.HTTP_204_NO_CONTENT)


def inflate_textsheet(requestdata):

    if "experiment" in requestdata and requestdata["experiment"]:

        new_experiment = Experiment.objects.get(title = requestdata.pop("experiment"))
        if new_experiment:
            requestdata["experiment"] = new_experiment.pk

    if "lastUser" in requestdata:

        del requestdata["lastUser"]

    if "creator" in requestdata:

        del requestdata["creator"]

    if "creationDate" in requestdata:

        del requestdata["creationDate"]

    if "lastModifiedDate" in requestdata:

        del requestdata["lastModifiedDate"]

class TextsheetsView(APIView):

    def post(self, request):

        """ POST activities/textsheets/

            Adds a textsheet
        """

        request.user.check_perms(("activities.add_textsheet",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        inflate_textsheet(request.data)
        request.data["creator"] = request.user.pk
        request.data["lastUser"] = request.user.pk

        ser = TextsheetSerializer(data = request.data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_201_CREATED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)


class TextsheetView(APIView):

    def get(self, request, pk):

        """ GET activities/textsheets/<textsheet_id>

            Retrieves a specific textsheet
        """

        request.user.check_perms(("activities.view_textsheet",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        ts = Textsheet.objects.get(pk = pk)
        ser = TextsheetSerializer(ts)

        return JsonResponse(ser.data, status = status.HTTP_200_OK)

    def put(self, request, pk):

        """ PUT activities/textsheets/<textsheet_id>

            Edits a specific textsheet
        """

        request.user.check_perms(("activities.change_textsheet",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        inflate_textsheet(request.data)

        ts = Textsheet.objects.get(pk = pk)
        ser = TextsheetSerializer(ts, data = request.data, partial = True)

        if ser.is_valid():

            ser.save(lastUser = request.user, lastModifiedDate = timezone.now())
            return JsonResponse(ser.data, status = status.HTTP_202_ACCEPTED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):

        """ DELETE activities/textsheets/<textsheet_id>

            Deletes a specific textsheet
        """

        request.user.check_perms(("activities.delete_textsheet",))
        log.info(f"{request.user} accessed {request.method} {request.get_full_path()}")

        ts = Textsheet.objects.get(pk = pk)
        ts.delete()

        return HttpResponse("Delete successful", status = status.HTTP_204_NO_CONTENT)