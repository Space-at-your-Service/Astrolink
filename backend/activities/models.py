from datetime import datetime

from django.db import models
from django.contrib.auth import get_user_model


class ProcedureType(models.Model):

    type = models.CharField(max_length = 50)

    def __str__(self):

        return self.type


class ProcedureSubtype(models.Model):

    subtype = models.CharField(max_length = 50)
    masterType = models.ForeignKey(ProcedureType, on_delete = models.CASCADE, related_name = "subtypes")

    def __str__(self):

        return f"{self.masterType} -> {self.subtype}"


class Procedure(models.Model):

    """ Procedure
    Represents a procedure (SOP) stored in the DB

    @field nick (str) : A short name for the url (e.g base-cleaning, redmars-exp)
    @field title (str) : The title of the procedure
    @field types (ProcedureSubtype) : The type and subtypes of the procedure
    @field abstract (str) : The quantity of this item currently in stock
    @field pdfFile (str) : The path to the file associated
    """

    nick = models.SlugField(max_length = 50, primary_key = True, unique = True)
    title = models.CharField(max_length = 50)
    types = models.ForeignKey(ProcedureSubtype, on_delete = models.CASCADE, related_name = "procedures", null = True)
    abstract = models.CharField(max_length = 140)
    pdfFile = models.FileField(max_length = 100)

    def __str__(self):

        return f"[{self.types.masterType}] {self.title}"


class Experiment(models.Model):

    title = models.CharField(max_length = 50, default = "This is a title")
    status = models.CharField(max_length = 10, choices = [("complete", "complete"),
                                                          ("planned", "planned"),
                                                          ("aborted", "aborted")], default = "planned")

    abstract = models.CharField(max_length = 140, default = "This is an abstract")
    description = models.CharField(max_length = 300, default = "This is a description")
    operators = models.ManyToManyField(get_user_model(), related_name = "experiments_operating")
    supervisor = models.ForeignKey(get_user_model(), on_delete = models.CASCADE, related_name = "experiments_supervising", null = True)
    protocol = models.ManyToManyField(Procedure, related_name = "experiments_using")


class Datasheet(models.Model):

    title = models.CharField(max_length = 50, default = "This is a title")
    creationDate = models.DateTimeField(auto_now_add = True)
    lastModifiedDate = models.DateTimeField(default = datetime.now)
    creator = models.ForeignKey(get_user_model(), on_delete = models.CASCADE, related_name = "datasheets_created", null = True)
    lastUser = models.ForeignKey(get_user_model(), on_delete = models.CASCADE, null = True)
    contents = models.FileField(max_length = 100)


class Task(models.Model):

    holder = models.OneToOneField(get_user_model(), on_delete = models.CASCADE, null = True)
    procedures = models.ManyToManyField(Procedure, related_name = "tasks")

    start = models.DateTimeField(default = datetime.now)
    end = models.DateTimeField(default = datetime.now)
    title = models.CharField(max_length = 50, default = "This is a title")
    content = models.CharField(max_length = 300, default = "Content")
    category = models.CharField(max_length = 20, choices = [("Break", "Break"),
                                                            ("Routine", "Routine"),
                                                            ("IBS", "IBS"),
                                                            ("OBS", "OBS"),
                                                            ("Sport", "Sport"),
                                                            ("External-contact", "External-contact")], default = "Break")

    background = models.BooleanField(default = False)
    allDay = models.BooleanField(default = False)

    def __str__(self):

        return f"[{self.holder.username}] {self.title}"