"""
communication > urls
Handles the routing 
of the app's views
"""


from django.urls import path

from .views import CommunicationView


urlpatterns = [
  path("", CommunicationView.as_view()),
    path("<slug:pk>", CommunicationView.as_view()),

]