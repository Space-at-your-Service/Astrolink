from rest_framework.permissions import BasePermission


#Fail-safe default, mirror of DRF's AllowAny
class DenyAny(BasePermission):

    def has_permission(self, request, view):
        return False


class IsAstronaut(BasePermission):

    def has_permission(self, request, view):
        return request.user.groups.filter(name = "Astronauts")


class IsMCC(BasePermission):

    def has_permission(self, request, view):
        return request.user.groups.filter(name = "MCC")


class IsPI(BasePermission):

    def has_permission(self, request, view):
        return request.user.groups.filter(name = "Principal Investigators")


def per_method(permidict):

    def internal(_fun):

        def newperms(self):

            return (permidict[self.request.method](),)

        return newperms

    return internal