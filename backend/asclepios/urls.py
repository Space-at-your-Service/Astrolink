from django.urls import path

from . import views


urlpatterns = [

    path("permissions_lexicon/", views.PermiView.as_view()),
    path("profile/", views.UserView.as_view()),

]