from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE


# Create your models here.
class Sticky(models.Model):
    title = models.CharField(max_length=255)
    content = models.CharField(max_length=500)
    color = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=CASCADE)
    
    def __str__(self):
        return self.title
