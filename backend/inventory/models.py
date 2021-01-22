"""
inventory > models
Defines all the different
models of the app
"""


from django.db import models


class Item(models.Model):

    """ Represents an item inventoried in the base

    @field identifier (str) : A unique ID for the item (e.g KI33)
    @field name (str) : A human-readable name 
    @field details (str) : Some description for the item
    @field quantity (int) : The quantity of this item currently in stock
    """

    id = models.SlugField(max_length = 6, primary_key = True, unique = True)
    name = models.CharField(default = "Item", max_length = 20)
    details = models.CharField(default = "This is an item !", max_length = 140)
    quantity = models.PositiveSmallIntegerField(default = 0)

    class Meta:
        permissions = [("modify_item_qty", "Can modify an Item count"),
                      ]

    def __str__(self):

        return f"{self.name} ({self.quantity})"