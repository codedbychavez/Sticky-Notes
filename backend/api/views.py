from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Sticky
from .serializer import StickySerializer


from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
    AllowAny,
    IsAuthenticated,
)
from rest_framework.decorators import api_view, permission_classes

# Create your views here.

@permission_classes([IsAuthenticated])
class allSticky(APIView):
    def get(self, request, *args, **kwargs):
        try:
            stickies = Sticky.objects.all()
            sticky_serializer = StickySerializer(stickies, many=True)
            user_message = 'Success getting stickies'
            print(user_message)
            return Response(sticky_serializer.data, status=status.HTTP_200_OK)
        except:
            user_message = 'Error creating stickes'
            return Response(user_message, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class create(APIView):
    def post(self, request, *args, **kwargs):
        try:
            print(request.data)
            sticky_serializer = StickySerializer(data=request.data)
            if sticky_serializer.is_valid():
                sticky_serializer.save()
                latest_sticky = Sticky.objects.last()
                sticky_serializer = StickySerializer(latest_sticky, many=False)
            user_message = 'Success creating sticky'
            print(user_message)
            return Response(sticky_serializer.data, status=status.HTTP_201_CREATED)
        except:
            user_message = 'Error creating sticky'
            return Response(user_message, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class update(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        try:
            sticky_id = request.data['id']
            sticky_instance = Sticky.objects.get(id=sticky_id)
            sticky_serializer = StickySerializer(sticky_instance, data=request.data)
            if sticky_serializer.is_valid():
                sticky_serializer.save()
            user_message = 'Success updating sticky'
            print(user_message)
            return Response(sticky_serializer.data, status=status.HTTP_200_OK)
        except:
            user_message = 'Error updating sticky'
            return Response(user_message, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class delete(APIView):
    def post(self, request, *args, **kwargs):
        try:
            sticky_id = request.data
            sticky = Sticky.objects.get(id=sticky_id)
            sticky.delete()
            user_message = 'Success deleting sticky'
            print(user_message)
            return Response(status=status.HTTP_201_CREATED)
        except:
            user_message = 'Error deleting sticky'
            return Response(user_message, status=status.HTTP_400_BAD_REQUEST)