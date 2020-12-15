from rest_framework.views import APIView
from django.http import JsonResponse


class GlobalView(APIView):

    def get(self, request):

        return JsonResponse(list(request.user.get_all_permissions()), safe = False)