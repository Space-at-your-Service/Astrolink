from django.urls import path

from .views import ProceduresView, ProcedureView, ProcedureTypesView, PlanningView, FlightplanView


urlpatterns = [

    path("procedures/", ProceduresView.as_view()),
    path("procedures/<slug:pk>", ProcedureView.as_view()),

    path("procedure_types/", ProcedureTypesView.as_view()),

    path("planning/", PlanningView.as_view()),
    path("flightplan/", FlightplanView.as_view())

]