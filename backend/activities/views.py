"""
activities > views
Defines all of the app's
REST Endpoints
"""


from wsgiref.util import FileWrapper

from django.contrib.auth import get_user_model
from django.http import JsonResponse, HttpResponse

from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView

from .models import Procedure, ProcedureType, Task, Experiment
from .serializers import ProcedureSerializer, ProcedureTypeSerializer, TaskSerializer, ExperimentSerializer, TextsheetSerializer


class ProceduresView(APIView):

    parser_classes = (MultiPartParser, FormParser,)

    def get(self, request):

        """ GET activities/procedures/

            Retrieves the list of all procedures
        """

        request.user.check_perms(("activities.view_procedure",))

        all_procedures = Procedure.objects.all()
        ser = ProcedureSerializer(all_procedures, context = {"request" : request}, many = True)

        return JsonResponse(ser.data, safe = False)

    def post(self, request):

        """ POST activities/procedures/

            Adds a new procedure
        """

        request.user.check_perms(("activities.add_procedure",))

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

        procedure = Procedure.objects.get(pk = pk)

        return HttpResponse(FileWrapper(procedure.pdfFile), content_type = "application/pdf")

    def put(self, request, pk):

        """ PUT activities/procedure/<procedure_title>

            Edits a specific procedure's pdf
        """

        request.user.check_perms(("activities.change_procedure",))

        procedure = Procedure.objects.get(pk = pk)

        f = request.data["pdfFile"]

        procedure.pdfFile.save(f.name, f, save = True)

        return HttpResponse("Upload successful", status = status.HTTP_202_ACCEPTED)

    def delete(self, request, pk):

        """ DELETE activities/procedures/<procedure_title>

            Deletes a specific procedure
        """

        request.user.check_perms(("activities.delete_procedure",))

        procedure = Procedure.objects.get(pk = pk)
        procedure.delete()

        return HttpResponse("Delete successful", status = status.HTTP_204_NO_CONTENT)


class ProcedureTypesView(APIView):

    def get(self, request):

        """ GET activities/procedure_types/

            Retrieves the list of all procedure types and subtypes
        """

        request.user.check_perms(("activities.view_proceduretype",))

        alltypes = ProcedureType.objects.all()

        ser = ProcedureTypeSerializer(alltypes, many = True, context = {"request" : request})

        return JsonResponse(ser.data, safe = False)


class PlanningView(APIView):

    def get(self, request):

        """ GET activities/planning/

            Retrieves the planning of the user requesting
        """

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

        ser = TaskSerializer(data = request.data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_201_CREATED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)


class FlightplanView(APIView):

    def get(self, request):

        """ GET activities/flightplan/

            Gets the astronaut's planning, i.e flightplan
        """

        #TODO: add permission

        astronauts = get_user_model().objects.filter(groups__unit__name = "Astronauts") #TODO : don't hardcode this, create method get_astronauts under asclepian for instance
        ser = TaskSerializer(Task.objects.filter(holder__in = astronauts), many = True)

        return JsonResponse(ser.data, status = status.HTTP_200_OK, safe = False)


class ExperimentsView(APIView):

    def get(self, request):

        """ GET activities/experiments/

            Retrieves all the experiments
        """

        request.user.check_perms(("activities.view_experiment",))

        all_experiments = Experiment.objects.all()
        ser = ExperimentSerializer(all_experiments, many = True)

        return JsonResponse(ser.data, safe = False)


    def post(self, request):

        """ POST activities/experiments/

            Adds a new experiment
        """

        request.user.check_perms(("activities.add_experiment",))

        ser = ExperimentSerializer(data = request.data)

        if ser.is_valid():

            ser.save()
            return JsonResponse(ser.data, status = status.HTTP_201_CREATED)

        return JsonResponse(ser.errors, status = status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):

        """ PUT activities/experiments/<experiment_title>

            Edits an experiment (+ Adds textsheets/datasheets)
        """

        experiment = Experiment.objects.get(pk = pk)

        if "data" in request.data:

            request.user.check_perms(("activities.add_textsheet", "activities.add_spreadsheet"))

            textsheets = request.data["data"].get("textsheets", [])
            spreadsheets = request.data["data"].get("spreadsheets", [])

            for t in textsheets:
                t["experiment"] = experiment.title

            rep = {}
            stus = 0

            if textsheets:

                ser = TextsheetSerializer(data = textsheets, many = True)

                if ser.is_valid():

                    experiment.textsheets.add(*ser.save())
                    experiment.save()

                    rep.update({"textsheets" : ser.data})
                    stus = status.HTTP_201_CREATED

                else:

                    rep.update({"textsheets" : ser.errors})
                    stus = status.HTTP_400_BAD_REQUEST

            if spreadsheets:

                pass #TODO Implement when spreadsheets are done

            if rep and stus != 0:

                return JsonResponse(rep, status = stus)

        return JsonResponse({"errors" : "no data provided !"}, status = status.HTTP_400_BAD_REQUEST)