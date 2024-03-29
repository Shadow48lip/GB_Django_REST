from django.http import HttpResponse
from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet

from todo.filters import ProjectFilter, TodoFilter
from todo.models import Project, Todo
from todo.serializers import ProjectModelSerializer, TodoModelSerializer, TodoModelSerializerBase


# Paginations
class ProjectPageNumberPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 10000


class TodoPageNumberPagination(PageNumberPagination):
    page_size = 20
    max_page_size = 10000


# Views
def index(request):
    return HttpResponse("Welcome to TODO API interface.")


# для постраничного вывода размер страницы 10 записей; фильтрация по совпадению части названия проекта
class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPageNumberPagination
    filterset_class = ProjectFilter


# при удалении не удалять Todo_, а выставлять признак, что оно закрыто; добавить фильтрацию; 20 записей на страницу
class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.filter(is_active=True)
    # queryset = Todo_.objects.get_queryset().order_by('-id')
    # serializer_class = TodoModelSerializerBase
    pagination_class = TodoPageNumberPagination
    filterset_class = TodoFilter

    # Разные сериалайзеры в зависимости от метода. Это же учтено во фронте.
    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TodoModelSerializer
        # в других методах Проект выводим простыми id, а не доп. объектом
        return TodoModelSerializerBase

    # вместо удаления переключаем флаг
    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
