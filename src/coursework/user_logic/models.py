from django.db import models


class Role(models.Model):
    AVAILABLE_ROLES = (
        ("client", "client"),
        ("expert", "expert")
    )
    id = models.IntegerField(primary_key=True)
    name = models.TextField(choices=AVAILABLE_ROLES)

    def __str__(self):
        return self.name


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    mail = models.TextField(max_length=30)
    password = models.TextField(max_length=30)
    name = models.TextField(max_length=30)
    age = models.IntegerField(max_length=3, null=True)
    gender = models.TextField(max_length=7, null=True)
    earnedMoney = models.IntegerField(null=True)

    def __str__(self):
        return self.name


class Grant(models.Model):
    id = models.IntegerField(primary_key=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    Role = models.ForeignKey(
        Role,
        related_name='role',
        on_delete=models.CASCADE)
    User = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.User} with role {self.Role} "
