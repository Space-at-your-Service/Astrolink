from django.urls import path

from .views import ProfileView, GroupView


urlpatterns = [

    path("profile/", ProfileView.as_view()),
    path("unit/<str:pk>", GroupView.as_view())

]