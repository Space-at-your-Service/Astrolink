"""
Communication > models
Defines all the different
models of the app
inspired by 
https://codingwithmitch.com/courses/real-time-chat-messenger/
"""

from datetime import date

from django.db import models
from django.conf import settings
import os.path
class Room(models.Model):

    """ Represents a room in the communication page

    @field room (str) : A unique name for the room (ex: global)
    @field users (list) : list of the users in the room ( JSONfield)
    """
   
    id = models.SlugField(max_length = 6, primary_key = True, unique = True)
    name = models.CharField(unique=True, max_length = 20, blank = False)
    users = models.TextField( blank = True ,help_text="user who are connected to the room")
    
    class Meta:
        permissions = [("view_communication","can view communication") ]
                         

    def __str__(self):

        return f"{self.name} ({self.users})"


    def connect_user(self, user):
        '''
        return true if user is added to list of users
        '''
        is_user_added = False

        if not user in self.users.all():
            self.user.add(user)
            self.save()
            is_user_added = True
        elif user in self.users.all():
            is_user_added = True
        return is_user_added

    def disconnect_user(self,user):
        """
        return true is user is removed from user list
        """       
        is_user_removed = False

        if user in self.users.all():
            self.user.remove(user)
            self.save()
            is_user_added = True

        return is_user_removed

    @property
    def group_name(self):
        '''
        returns channels group name that sockets should subscribe to and get sent messages as they are generated
        '''
        return f"PrivateChannel-{self.id}"

class RoomAudioManager(models.Manager):
    def by_room(self, room):
        qs = RoomAudio.object.filter(room=room).order_by("-timestamp")
        return qs
class RoomAudio(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    audiofile = models.FileField(upload_to='recordings/%Y/%m/%d')
    objects = RoomAudioManager()
    def __str__(self):
        return str(self.audiofile)


