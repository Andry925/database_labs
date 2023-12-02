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
