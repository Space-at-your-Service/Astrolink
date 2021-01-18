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

    title = models.CharField(max_length = 50, primary_key = True)
    types = models.ForeignKey(ProcedureSubtype, on_delete = models.PROTECT, related_name = "procedures", null = True)
    abstract = models.CharField(max_length = 140)

    favoriteOf = models.ManyToManyField(get_user_model(), related_name = "favoriteProcedures")

    pdfFile = models.FileField(max_length = 100)

    def __str__(self):

        return f"[{self.types}] {self.title}"


class Experiment(models.Model):

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

    title = models.CharField(max_length = 50, primary_key = True)

    experiment = models.ForeignKey(Experiment, on_delete = models.CASCADE, related_name = "textsheets")

    creationDate = models.DateTimeField(auto_now_add = True)
    lastModifiedDate = models.DateTimeField(auto_now_add = True)

    creator = models.ForeignKey(get_user_model(), on_delete = models.CASCADE, related_name = "datasheets_created")
    lastUser = models.ForeignKey(get_user_model(), on_delete = models.CASCADE)

    content = models.TextField(blank = True)

    def __str__(self):

        return f"[{self.experiment.title}] {self.title}"


class Spreadsheet(models.Model):

    experiment = models.ForeignKey(Experiment, on_delete = models.CASCADE, related_name = "spreadsheets")
    #TODO : This is yet to be implemented


class Task(models.Model):

    title = models.CharField(max_length = 50, primary_key = True)

    holder = models.ForeignKey(get_user_model(), on_delete = models.CASCADE, null = True)
    procedures = models.ManyToManyField(Procedure, related_name = "tasks", blank = True)

    start = models.DateTimeField(default = datetime.now)
    end = models.DateTimeField(default = datetime.now)

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