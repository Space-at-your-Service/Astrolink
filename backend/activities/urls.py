from django.urls import path

from .views import ProceduresView, ProcedureView, ProcedureSubtypeView, PlanningView


urlpatterns = [

    path("procedures/", ProceduresView.as_view()),
    path("procedures/<slug:pk>", ProcedureView.as_view()),

    path("procedure_types/", ProcedureSubtypeView.as_view()),

    path("planning/", PlanningView.as_view())

]