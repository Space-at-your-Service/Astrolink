"""
Audio > urls
Handles the routing 
of the app's views
"""


from django.urls import path

from .views import AudiosView


urlpatterns = [
  path("audios/", AudiosView.as_view()),
  
  path("audios/<str:id>", AudiosView.as_view()),

]