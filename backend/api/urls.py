from django.urls import path
from .views import *

urlpatterns = [
    path('create_sticky', create.as_view()),
    path('update_sticky', update.as_view()),
    path('delete_sticky', delete.as_view()),
    path('all_sticky', allSticky.as_view()),
]