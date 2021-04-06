"""
Communication > admin
Registers all the different
models of the app in the
django admin website
"""

from django.contrib import admin
from django.core.paginator import Paginator
from django.core.cache import cache
from django.db import models

from .models import RoomAudio, Room

class RoomAdmin(admin.ModelAdmin):
    list_display=['id','name']
    search_fields=['id','name']
    class Meta:
        model = Room

admin.site.register(Room,RoomAdmin )   

#http://masnun.rocks/2017/03/20/django-admin-expensive-count-all-queries/
class CachingPaginator(Paginator):
    '''
    caches the messages (audios) 
    '''
    def _get_count(self):

        if not hasattr(self, "_count"):
            self._count = None

        if self._count is None:
            try:
                key = "adm:{0}:count".format(hash(self.object_list.query.__str__()))
                self._count = cache.get(key, -1)
                if self._count == -1:
                    self._count = super().count
                    cache.set(key, self._count, 3600)

            except:
                self._count = len(self.object_list)
        return self._count

    count = property(_get_count)


class RoomAudioAdmin(admin.ModelAdmin):
    list_filter = ['room', 'user', 'timestamp']
    list_display = ['room', 'user', 'timestamp','audiofile']
    search_fields = ['room_name', 'user__name', 'audiofile']
    #readonly_fields = ['id', 'user', 'room','timestamp']
    show_full_result_count = Falsepaginator = CachingPaginator

    class Meta:
        model = RoomAudio

    





admin.site.register(RoomAudio, RoomAudioAdmin)
    


