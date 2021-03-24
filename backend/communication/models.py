"""
Communication > models
Defines all the different
models of the app
"""


from django.db import models


class Room(models.Model):

    """ Represents a room in the communication page

    @field room (str) : A unique name for the room (ex: global)
    @field users (list) : list of the users in the room ( JSONfield)
    """

    name = models.CharField(default = "room", max_length = 20)
    users = models.JSONField()

    #class Meta:
       # permissions = [("can join this room") ]
                     

    def __str__(self):

        return f"{self.name} ({self.users})"