from django.db import models

class Client(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    trainer = models.ForeignKey('Trainer', on_delete=models.PROTECT, related_name='clients')
    plan = models.CharField(max_length=100)
    goal = models.CharField(max_length=200)
    joining_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, 
                              choices=[('active', 'Active'), ('inactive', 'Inactive')], 
                              default='active')

    def __str__(self):
        return self.name


class Trainer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    specialization = models.CharField(max_length=100)
    experience_years = models.IntegerField()
    joining_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, 
                              choices=[('active', 'Active'), ('inactive', 'Inactive')], 
                              default='active')
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name    