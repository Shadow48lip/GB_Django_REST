from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter
# from authors.views import AuthorModelViewSet
from todo.views import index, ProjectModelViewSet, TodoModelViewSet
from users.views import UserCustomViewSet

router = DefaultRouter()
# router.register('authors', AuthorModelViewSet)
router.register('users', UserCustomViewSet)
router.register('project', ProjectModelViewSet)
router.register('project_todo', TodoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]
