from django.urls import path

from .views import GlobalView, SelectiveView


urlpatterns = [

    path("", GlobalView.as_view()),
    path("<slug:pk>", SelectiveView.as_view()),

]