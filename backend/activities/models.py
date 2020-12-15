from django.db import models


class Procedure(models.Model):

    """ Procedure
    Represents a procedure (SOP) stored in the DB

    @field nick (str) : A short name for the url (e.g base-cleaning, redmars-exp)
    @field title (str) : The title of the procedure
    @field type (str) : The type of the procedure (one of : "", "", "")
    @field abstract (str) : The quantity of this item currently in stock
    @field pdfFile (str) : The path to the file associated
    """

    nick = models.SlugField(max_length = 50, primary_key = True, unique = True)
    title = models.CharField(max_length = 50)
    type = models.CharField(max_length = 50)
    subtype = models.CharField(max_length = 50, null = True)
    abstract = models.CharField(max_length = 140)
    pdfFile = models.FileField(max_length = 100) #TODO : Change this, files need to be stored in the DB as blobs !

    def __str__(self):

        return f"[{self.type}] {self.title}"


class Experiment(models.Model):

    pass


class Task(models.Model):

    pass