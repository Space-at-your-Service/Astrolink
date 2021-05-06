"""
communication > urls
Handles the routing 
of the app's views
"""


from django.urls import path

from .views import AudioView


urlpatterns = [
  path("", AudioView.as_view()),
  path("<slug:pk>", AudioView.as_view()),


]