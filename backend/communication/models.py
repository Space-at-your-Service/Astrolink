"""
Communication > models
Defines all the different
models of the app
"""

from datetime import date

from django.db import models
from django.conf import settings
import os.path
class Room(models.Model):

    """ Represents a room in the communication page
    @field id (str) : A unique id for the room 
    @field room (str) : the  name for the room (ex: global)
    @field users (str) : list of the users in the room  
    @field usersSpeaking (str) : list of the users in the room who are speaking 

    """
   
    id = models.SlugField(max_length = 6, primary_key = True, unique = True)
    name = models.CharField(unique=True, max_length = 20, blank = False)
    users = models.TextField( blank = True ,help_text="user who are connected to the room")
    usersSpeaking = models.TextField( blank = True ,help_text="user who are speaking in the room")

    
    class Meta:
        permissions = [("view_communication","can view communication") ]
                         

    def __str__(self):

        return f"{self.name} ({self.users})"
