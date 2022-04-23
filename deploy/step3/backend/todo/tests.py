from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from .views import ProjectModelViewSet
from .models import Project, Todo
from users.models import User


class TestMainappSmoke(TestCase):

    def test_index_urls(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_api_urls(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, 200)


# APIRequestFactory «подменяет» объект запроса, который мы потом передаём во view. Используется редко
class TestProjectViewSetFactory(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest_and_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/', {'name': 'Рыть яму', 'users': [2], 'link': 'https://www.ru'},
                               format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        admin = User.objects.create_superuser('admin', 'admin@geekbrains.local', 'admin1234')
        force_authenticate(request, admin)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


# APIClient — класс для удобной отправки REST-запросов. Этот класс:
# - отправляет запрос;
# - обычно используется для большинства тестов
class TestProjectViewSetAPIClient(TestCase):
    def test_get_detail(self):
        project = Project.objects.create(name='Покрасить стену', link='https://www.ru')
        # print('Create project.id = ', project.id)
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        project = Project.objects.create(name='Покрасить стену', link='https://www.ru')
        client = APIClient()
        response = client.put(f'/api/projects/{project.id}/',
                              {'name': 'Рыть яму', 'users': [2], 'link': 'https://www.ru'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        project = Project.objects.create(name='Покрасить стену', link='https://www.ru')
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@geekbrains.local', 'admin123')
        client.login(username='admin', password='admin123')
        response = client.put(f'/api/projects/{project.id}/',
                              {'name': 'Рыть яму', 'users': [2], 'link': 'https://www.ru'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'Рыть яму')
        self.assertEqual(project.link, 'https://www.ru')
        client.logout()


# APISimpleTestCase позволяет создавать класс для тестирования, не связанный с базой данных.
# Удобен для тестирования внутренних функций
class TestMath(APISimpleTestCase):
    def test_sqrt(self):
        import math
        self.assertEqual(math.sqrt(4), 2)


# APITestCase уже содержит в себе экземпляр класса APIClient, поэтому наиболее удобен для
# решения большинства задач.
class TestTodoViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/project_todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        project = Project.objects.create(name='Покрасить стену', link='https://www.ru')
        user = User.objects.create_superuser('admin', 'admin@geekbrains.local', 'admin123')
        todo_item = Todo.objects.create(text='Какой-то текст', project=project, user=user)
        # print('ID: ', todo_item.id)
        self.client.login(username='admin', password='admin123')
        response = self.client.put(f'/api/project_todos/{todo_item.id}/',
                                   {'text': 'Ромашка', 'project': todo_item.project.id, 'user': user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo_item = Todo.objects.get(id=todo_item.id)
        self.assertEqual(todo_item.text, 'Ромашка')
        self.assertEqual(todo_item.project.id, project.id)

    # Библиотека mixer сама заполнит нас Проект и Туду записи
    def test_edit_mixer(self):
        todo_item = mixer.blend(Todo)
        # print(todo_item.user)
        user = User.objects.create_superuser('admin', 'admin@geekbrains.local', 'admin123')
        self.client.login(username='admin', password='admin123')
        response = self.client.put(f'/api/project_todos/{todo_item.id}/',
                                   {'text': 'Ромашка', 'project': todo_item.project.id, 'user': todo_item.user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo_item = Todo.objects.get(id=todo_item.id)
        self.assertEqual(todo_item.text, 'Ромашка')

    def test_get_detail(self):
        # Иногда нам нужно указать некоторые значения полей модели, а остальные оставить случайными.
        todo_item = mixer.blend(Todo, text='Самокат')
        response = self.client.get(f'/api/project_todos/{todo_item.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_todo = json.loads(response.content)
        self.assertEqual(response_todo['text'], 'Самокат')

        # Если требуется указать поле связанной модели.
        todo_item = mixer.blend(Todo, project__name='Покрасить стену')
        response = self.client.get(f'/api/project_todos/{todo_item.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_todo = json.loads(response.content)
        self.assertEqual(response_todo['project']['name'], 'Покрасить стену')