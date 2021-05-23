"""
Audio > urls
Handles the routing 
of the app's views
"""


from django.urls import path

from .views import AudiosView, AudioView


urlpatterns = [
  path("audios/", AudiosView.as_view()),
  path("audios/audio/<str:id>", AudioView.as_view()),

  path("audios/<str:id>", AudiosView.as_view()),

]