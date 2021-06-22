"""
activities > models
Defines all the different
models of the app
"""


from datetime import datetime
from os.path import join

from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone


def procedure_path(instance, filename):

    return join("procedures", 
                instance.types.masterType.type, 
                instance.types.subtype,
                filename)


class ProcedureType(models.Model):

    """ Represents a procedure's type, or main category

        @param type (str < 50) : The actual name of the type
    """

    type = models.CharField(max_length = 50)

    def __str__(self):

        return self.type


class ProcedureSubtype(models.Model):

    """ Represents a procedure's subtype, or sub-category

        @param subtype (str) : The actual name of the sub-type
        @param masterType (ProcedureType) : The type that this sub-type is a sub-type of
    """

    subtype = models.CharField(max_length = 50)
    masterType = models.ForeignKey(ProcedureType, on_delete = models.CASCADE, related_name = "subtypes")

    def __str__(self):

        return f"{self.masterType} -> {self.subtype}"


class Procedure(models.Model):

    """ Represents a Standard Operating Procedure (SOP)

        @param title (str, PK) : The title of the procedure
        @param types (ProcedureSubtype) : The types of this procedure (as a subtype object which also contains the main type)
        @param abstract (str) : The abstract of the procedure
        @param favoriteOf ([Asclepian]) : The users who have this procedure as a favorite
        @param pdfFile (*file) : A pointer to the SOP's pdf. Will create a path like "type/subtype/procedure.pdf
    """

    title = models.CharField(max_length = 50, primary_key = True)
    types = models.ForeignKey(ProcedureSubtype, on_delete = models.PROTECT, related_name = "procedures", null = True)
    abstract = models.CharField(max_length = 140)

    favoriteOf = models.ManyToManyField(get_user_model(), related_name = "favoriteProcedures", blank = True)

    pdfFile = models.FileField(max_length = 100, upload_to = procedure_path)

    def __str__(self):

        return f"[{self.types}] {self.title}"


class Experiment(models.Model):

    """ Represents an experiment

        @param title (str, PK) : The title of the experiment
        @param status (str) : The status of the experiment
        @param abstract (str) : The abstract of the experiment
        @param description (str) : The description of the experiment
        @param operators ([Asclepian]) : The list of users who perform the experiment
        @param supervisor (Asclepian) : The user who supervises the experiment
        @param procedures ([Procedure]) : The list of procedures associated with the experiment
    """

    title = models.CharField(max_length = 50, primary_key = True)
    status = models.CharField(max_length = 20, choices = (("planned", "planned"),
                                                          ("ongoing", "ongoing"),
                                                          ("complete", "complete"),
                                                          ("aborted", "aborted")))
    abstract = models.CharField(max_length = 140)
    description = models.CharField(max_length = 300)

    operators = models.ManyToManyField(get_user_model(), related_name = "experiments_operating", blank = True)
    supervisor = models.ForeignKey(get_user_model(), on_delete = models.CASCADE, related_name = "experiments_supervising", blank = True, null = True)

    procedures = models.ManyToManyField(Procedure, related_name = "experiments_using", blank = True)

    def __str__(self):

        return self.title


class Textsheet(models.Model):

    """ Represents an experiment's datasheet, textual version

        @param title (str) : The title of the sheet
        @param experiment (Experiment) : The experiment whose results this represents
        @param creationDate (datetime.datetime) : The date of creation of this sheet
        @param lastModifiedDate (datetime.datetime) : The date of last modification of this sheet
        @param creator (Asclepian) : The user who created this sheet
        @param lastUser (Asclepian) : The user who last modified this sheet
        @param content (str) : The contents of the file (can be very long, and contain HTML)
    """

    title = models.CharField(max_length = 50)

    experiment = models.ForeignKey(Experiment, on_delete = models.CASCADE, related_name = "textsheets")

    creationDate = models.DateTimeField(auto_now_add = True)
    lastModifiedDate = models.DateTimeField(default = timezone.now)

    creator = models.ForeignKey(get_user_model(), on_delete = models.CASCADE, related_name = "datasheets_created")
    lastUser = models.ForeignKey(get_user_model(), on_delete = models.CASCADE)

    content = models.TextField(blank = True)

    def __str__(self):

        return f"[{self.experiment.title}] {self.title}"


class Spreadsheet(models.Model):

    """ Represents an experiment's datasheet, tabular version

        @param experiment (Experiment) : The experiment whose results this represents
        #TODO: implement this model fully !
    """

    experiment = models.ForeignKey(Experiment, on_delete = models.CASCADE, related_name = "spreadsheets")


class Task(models.Model):

    """ Represents a task in a User's planning

        @param title (str) : The title of the task
        @param holder (Asclepian) : The user whose planning contains the task
        @param procedures ([Procedure]) : The procedures associated with the task
        @param start (datetime.datetime) : The date of beginning of the task
        @param end (datetime.datetime) : The date of ending of the task
        @param content (str) : The description of the task
        @param category (str) : The category of the task
        @param background (bool) : Whether this task is a background task
        @param allDay (bool) : Whether this task takes up all day
    """

    title = models.CharField(max_length = 50)

    holder = models.ForeignKey(get_user_model(), on_delete = models.CASCADE, null = True)
    procedures = models.ManyToManyField(Procedure, related_name = "tasks", blank = True)

    start = models.DateTimeField(default = datetime.now)
    end = models.DateTimeField(default = datetime.now)

    content = models.CharField(max_length = 300, default = "Content")
    category = models.CharField(max_length = 50, choices = [("Break", "Break"),
                                                            ("Routine", "Routine"),
                                                            ("IBS", "IBS"),
                                                            ("OBS", "OBS"),
                                                            ("Sport", "Sport"),
                                                            ("External-contact", "External-contact"),
                                                            ("Preparation", "Preparation"),
                                                            ("Data-analysis", "Data-analysis"),
                                                            ("Shift-tasks", "Shift-tasks"),
                                                            ("Briefing-debriefing", "Briefing-debriefing"),
                                                            ("Change-of-shift", "Change-of-shift"),
                                                            ("Meal", "Meal")], default = "Break")

    background = models.BooleanField(default = False)
    allDay = models.BooleanField(default = False)

    class Meta:
        permissions = [("touch_flightplan", "Modifications to the flightplan allowed"),]

    def __str__(self):

        return f"[{self.holder.username}] {self.title}"