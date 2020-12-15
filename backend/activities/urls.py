from django.urls import path

from .views import GlobalView, SelectiveView


urlpatterns = [

    path("procedures/", GlobalView.as_view()),
    path("procedures/<slug:pk>", SelectiveView.as_view()),

]