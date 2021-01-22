"""
inventory > urls
Handles the routing 
of the app's views
"""


from django.urls import path

from .views import ItemsView, ItemView


urlpatterns = [

    path("", ItemsView.as_view()),
    path("<slug:pk>", ItemView.as_view()),

]