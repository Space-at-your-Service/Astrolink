from django.urls import path

from . import views


urlpatterns = [

    path("", views.GlobalView.as_view()),
    path("<slug:pk>", views.SelectiveView.as_view()),

]