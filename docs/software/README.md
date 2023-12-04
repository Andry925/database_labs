# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення на початкового наповнення бази даних

``` sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema opinio
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `opinio` ;

-- -----------------------------------------------------
-- Schema opinio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `opinio` DEFAULT CHARACTER SET utf8 ;
USE `opinio` ;

-- -----------------------------------------------------
-- Table `opinio`.`Poll`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Poll` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Poll` (
  `id` INT NOT NULL,
  `title` MEDIUMTEXT NOT NULL,
  `description` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Question` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Question` (
  `id` INT NOT NULL,
  `type` MEDIUMTEXT NOT NULL,
  `text` LONGTEXT NOT NULL,
  `Poll_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Poll_id`),
  INDEX `fk_Question_Poll1_idx` (`Poll_id` ASC) VISIBLE,
  CONSTRAINT `fk_Question_Poll1`
    FOREIGN KEY (`Poll_id`)
    REFERENCES `opinio`.`Poll` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Answer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Answer` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Answer` (
  `id` INT NOT NULL,
  `field` BLOB NOT NULL,
  `Question_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Question_id`),
  INDEX `fk_Answer_Question_idx` (`Question_id` ASC) VISIBLE,
  CONSTRAINT `fk_Answer_Question`
    FOREIGN KEY (`Question_id`)
    REFERENCES `opinio`.`Question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Role` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Role` (
  `id` INT NOT NULL,
  `name` TINYTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`User` ;

CREATE TABLE IF NOT EXISTS `opinio`.`User` (
  `id` INT NOT NULL,
  `mail` MEDIUMTEXT NOT NULL,
  `password` MEDIUMTEXT NOT NULL,
  `name` MEDIUMTEXT NOT NULL,
  `age` INT NULL,
  `gender` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Grant`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Grant` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Grant` (
  `id` INT ZEROFILL NOT NULL,
  `assignedAt` DATE NOT NULL,
  `Role_id` INT NOT NULL,
  `User_id` INT NOT NULL,
  `Answer_id` INT NULL,
  `Answer_Question_id` INT NULL,
  `Poll_id` INT NULL,
  PRIMARY KEY (`id`, `Role_id`, `User_id`),
  INDEX `fk_Grant_Role1_idx` (`Role_id` ASC) VISIBLE,
  INDEX `fk_Grant_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Grant_Answer1_idx` (`Answer_id` ASC, `Answer_Question_id` ASC) VISIBLE,
  INDEX `fk_Grant_Poll1_idx` (`Poll_id` ASC) VISIBLE,
  CONSTRAINT `fk_Grant_Role1`
    FOREIGN KEY (`Role_id`)
    REFERENCES `opinio`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Grant_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `opinio`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Grant_Answer1`
    FOREIGN KEY (`Answer_id` , `Answer_Question_id`)
    REFERENCES `opinio`.`Answer` (`id` , `Question_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Grant_Poll1`
    FOREIGN KEY (`Poll_id`)
    REFERENCES `opinio`.`Poll` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`State`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`State` ;

CREATE TABLE IF NOT EXISTS `opinio`.`State` (
  `id` INT NOT NULL,
  `text` LONGTEXT NOT NULL,
  `type` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Action`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Action` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Action` (
  `id` INT NOT NULL,
  `date` DATE NOT NULL,
  `Poll_id` INT NOT NULL,
  `Grant_id` INT ZEROFILL NOT NULL,
  `State_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Poll_id`, `Grant_id`, `State_id`),
  INDEX `fk_Action_Poll1_idx` (`Poll_id` ASC) VISIBLE,
  INDEX `fk_Action_Grant1_idx` (`Grant_id` ASC) VISIBLE,
  INDEX `fk_Action_State1_idx` (`State_id` ASC) VISIBLE,
  CONSTRAINT `fk_Action_Poll1`
    FOREIGN KEY (`Poll_id`)
    REFERENCES `opinio`.`Poll` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Action_Grant1`
    FOREIGN KEY (`Grant_id`)
    REFERENCES `opinio`.`Grant` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Action_State1`
    FOREIGN KEY (`State_id`)
    REFERENCES `opinio`.`State` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Specialty`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Specialty` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Specialty` (
  `id` INT NOT NULL,
  `name` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Qualification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Qualification` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Qualification` (
  `id` INT NOT NULL,
  `level` INT NOT NULL,
  `User_id` INT NOT NULL,
  `Specialty_id` INT NOT NULL,
  PRIMARY KEY (`id`, `User_id`, `Specialty_id`),
  INDEX `fk_Qualification_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Qualification_Specialty1_idx` (`Specialty_id` ASC) VISIBLE,
  CONSTRAINT `fk_Qualification_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `opinio`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Qualification_Specialty1`
    FOREIGN KEY (`Specialty_id`)
    REFERENCES `opinio`.`Specialty` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`EarnedMoney`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`EarnedMoney` ;

CREATE TABLE IF NOT EXISTS `opinio`.`EarnedMoney` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `amount` INT NOT NULL,
  `tookAway` TINYINT NOT NULL,
  `User_id` INT NOT NULL,
  `Poll_id` INT NOT NULL,
  PRIMARY KEY (`id`, `User_id`, `Poll_id`),
  INDEX `fk_EarnedMoney_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_EarnedMoney_Poll1_idx` (`Poll_id` ASC) VISIBLE,
  CONSTRAINT `fk_EarnedMoney_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `opinio`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EarnedMoney_Poll1`
    FOREIGN KEY (`Poll_id`)
    REFERENCES `opinio`.`Poll` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

## RESTfull сервіс для управління даними

### Database schema (Django ORM)

```python
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
```

### Main file (api/views.py)

```python
from django.http import Http404
from user_logic.models import User, Grant, Role
from rest_framework import status, generics, mixins
from rest_framework.response import Response
from rest_framework.views import APIView
from . serializers import UserSerializers, RoleSerializers, GrantSerializers


class ManegeAllUsers(APIView):

    def get(self, request):
        all_users = User.objects.all()
        get_serializer = UserSerializers(all_users, many=True)
        return Response(get_serializer.data)

    def post(self, request):
        post_serializer = UserSerializers(data=request.data)
        if post_serializer.is_valid():
            post_serializer.save()
            return Response(
                post_serializer.data,
                status=status.HTTP_201_CREATED)
        return Response(
            post_serializer.errors,
            status=status.HTTP_400_BAD_REQUEST)


class ManageParticularUser(APIView):
    def get_object(self, pk):
        try:
            single_user = User.objects.get(pk=pk)
            return single_user
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        got_user = self.get_object(pk=pk)
        get_serializer = UserSerializers(got_user)
        return Response(get_serializer.data)

    def put(self, request, pk):
        put_user = self.get_object(pk=pk)
        put_serializer = UserSerializers(put_user, data=request.data)
        if put_serializer.is_valid():
            put_serializer.save()
            return Response(put_serializer.data)
        return Response(
            put_serializer.errors,
            status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        delete_user = self.get_object(pk=pk)
        delete_user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ManageRoles(APIView):
    def get(self, request):
        all_roles = Role.objects.all()
        get_serializer = RoleSerializers(all_roles, many=True)
        return Response(get_serializer.data)

    def post(self, request):
        post_serializer = RoleSerializers(data=request.data)
        if post_serializer.is_valid():
            post_serializer.save()
            return Response(
                post_serializer.data,
                status=status.HTTP_201_CREATED)
        return Response(
            post_serializer.errors,
            status=status.HTTP_400_BAD_REQUEST)


class ManageGrants(
        mixins.ListModelMixin,
        mixins.CreateModelMixin,
        generics.GenericAPIView):
    queryset = Grant.objects.all()
    serializer_class = GrantSerializers

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)


class ManageParticularGrant(
        mixins.RetrieveModelMixin,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin,
        generics.GenericAPIView):
    queryset = Grant.objects.all()
    serializer_class = GrantSerializers

    def get(self, request, pk):
        return self.retrieve(request, pk)

    def put(self, request, pk):
        return self.update(request, pk)

    def delete(self, request, pk):
        return self.destroy(request, pk)
```

### Connection to MySQL databese inside settings.py

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'final_work',
        'USER': 'root',
        'PASSWORD': 'panel2004'
    }
}
```

### Serializers inside api/serializers.py

```python
from rest_framework import serializers
from user_logic.models import User, Role, Grant


class RoleSerializers(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class GrantSerializers(serializers.ModelSerializer):
    class Meta:
        model = Grant
        fields = "__all__"
```

### Urls inside api/urls.py

```python
from django.urls import path
from . import views


urlpatterns = [
    path("manage_all_users/",views.ManegeAllUsers.as_view(), name="manage_all_users"),
    path("manage_single_user/<int:pk>",views.ManageParticularUser.as_view(), name="manage_single_user"),
    path("manage_all_roles/",views.ManageRoles.as_view(), name="manage_all_users"),
    path("get_single_grant/<int:pk>/",views.ManageParticularGrant.as_view(), name="get_user's_grant"),
    path("manage_all_grants/", views.ManageGrants.as_view(),name="post_new_grant")
    
]
```

### I also added unittests inside api/tests.py for better testing

```python 
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from user_logic.models import User, Role, Grant


class TestManageAllUsers(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_all_users(self):
        response = self.client.get(
            'http://127.0.0.1:8000/api/manage_all_users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        user = {
            'id': 5,
            'mail': 'test@example.com',
            'password': 'testpassword',
            'name': 'Test User',
            'age': 25,
            'gender': 'Male',
            'earnedMoney': 0
        }
        response = self.client.post(
            'http://127.0.0.1:8000/api/manage_all_users/', data=user)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestManageParticularUser(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            id=6,
            mail="some@gmail.com",
            password='testpassword',
            name='Test User',
            age=25,
            gender='Male',
            earnedMoney=0
        )

    def test_particular_user(self):
        response = self.client.get(
            f'http://127.0.0.1:8000/api/manage_single_user/{self.user.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_particular_user(self):
        updated_data = {
            'id': 6,
            'mail': 'test@example.com',
            'password': 'testpassword',
            'name': 'Test User',
            'age': 25,
            'gender': 'Female',
            'earnedMoney': 10
        }

        response = self.client.put(
            f'http://127.0.0.1:8000/api/manage_single_user/{self.user.id}',
            data=updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_user = User.objects.get(id=self.user.id)
        self.assertEqual(updated_user.mail, updated_data['mail'])
        self.assertEqual(updated_user.gender, updated_data['gender'])

    def test_delete_method(self):
        response = self.client.delete(
            f'http://127.0.0.1:8000/api/manage_single_user/{self.user.id}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(User.DoesNotExist):
            deleted_user = User.objects.get(id=self.user.id)


class TestRoles(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_all_roles(self):
        response = self.client.get(
            f'http://127.0.0.1:8000/api/manage_all_roles/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_role(self):
        role_object = {
            "id": 1,
            "name": "expert"
        }
        response = self.client.post(
            f'http://127.0.0.1:8000/api/manage_all_roles/',
            data=role_object)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestGrants(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.role = Role.objects.create(id=1, name="expert")
        self.user = User.objects.create(
            id=1,
            mail='test@example.com',
            password='testpassword',
            name='Test User',
            age=25,
            gender='Male',
            earnedMoney=0
        )
        self.grant_data = {
            'id': 1,
            'Role': self.role,
            'User': self.user,
        }
        self.grant = Grant.objects.create(**self.grant_data)

    def test_get_all_grants(self):
        response = self.client.get(
            'http://127.0.0.1:8000/api/manage_all_grants/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_grant(self):
        grant_object = {
            'id': 2,
            'Role': self.role.id,
            'User': self.user.id,
        }
        response = self.client.post(
            'http://127.0.0.1:8000/api/manage_all_grants/',
            data=grant_object)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_particular_grant(self):
        response = self.client.get(
            f'http://127.0.0.1:8000/api/get_single_grant/{self.grant.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_particular_grant(self):
        updated_data = {
            'Role': self.role.id,
            'User': self.user.id,
        }
        response = self.client.put(
            f'http://127.0.0.1:8000/api/get_single_grant/{self.grant.id}/',
            data=updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_grant = Grant.objects.get(id=self.grant.id)
        self.assertEqual(updated_grant.Role.id, updated_data['Role'])
        self.assertEqual(updated_grant.User.id, updated_data['User'])

    def test_delete_particular_grant(self):
        response = self.client.delete(
            f'http://127.0.0.1:8000/api/get_single_grant/{self.grant.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(Grant.DoesNotExist):
            deleted_grant = Grant.objects.get(id=self.grant.id)
```