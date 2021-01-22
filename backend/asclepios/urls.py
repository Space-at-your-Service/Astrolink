"""
asclepios > urls
Handles the routing 
of the app's views
"""


from django.urls import path

from .views import ProfileView, PasswordView, UnitsView


urlpatterns = [

    path("profile/", ProfileView.as_view()),
    path("password/", PasswordView().as_view()),
    path("unit/<str:pk>", UnitsView.as_view())

]