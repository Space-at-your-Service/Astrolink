""" Astrolink URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token

from asclepios.views import UserView


urlpatterns = [

    path("inventory/", include("inventory.urls")),
    path("activities/", include("activities.urls")),
    path("asclepios/", include("asclepios.urls")),

    path("profile/", UserView.as_view()),
    path("login/", obtain_auth_token),

    path("admin/", admin.site.urls),
]