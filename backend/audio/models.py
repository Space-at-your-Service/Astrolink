"""
Communication > models
Defines all the different
models of the app
inspired by 
"""

from datetime import date

from django.db import models
from django.conf import settings
import os.path
class Audio(models.Model):

    """ Represents a room in the communication page

    @field room (str) : A unique name for the room (ex: global)
    @field users (list) : list of the users in the room ( JSONfield)
    """
   
    id = models.SlugField(max_length = 100, primary_key = True, unique = True)
    user = models.TextField( blank = True ,help_text="user who sent the audio")
    rooms = models.TextField( blank = True ,help_text="room where the audio was sent")
    audiofile = models.FileField(upload_to="audios")                    
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):

        return f"{self.id} ({self.user})"


