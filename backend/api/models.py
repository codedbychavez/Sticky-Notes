from django.db import models

# Create your models here.
class Sticky(models.Model):
    title = models.CharField(max_length=255)
    content = models.CharField(max_length=500)
    color = models.CharField(max_length=255)
    
    def __str__(self):
        return self.title
