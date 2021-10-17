from django.urls import path
from .views import *

urlpatterns = [
    path('create', create.as_view()),
    path('update', update.as_view()),
    path('delete', delete.as_view()),
    path('all', allSticky.as_view()),
]