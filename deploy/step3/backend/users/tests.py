from rest_framework import status
from rest_framework.test import APITestCase
from mixer.backend.django import mixer
from .models import User


class TestTodoViewSet(APITestCase):
    def test_get_list(self):
        user = User.objects.create_superuser('admin', 'admin@geekbrains.local', 'admin123')
        self.client.login(username='admin', password='admin123')
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        user = User.objects.create_superuser('admin', 'admin@geekbrains.local', 'admin123')
        self.client.login(username='admin', password='admin123')

        user_item = mixer.blend(User)
        # response = self.client.get(f'/api/users/{user_item.id}/')
        response = self.client.put(f'/api/users/{user_item.id}/',
                                   {'username': 'ivan', 'password': user_item.password, 'email': 'user@mail.ru'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user_item = User.objects.get(id=user_item.id)
        self.assertEqual(user_item.username, 'ivan')
