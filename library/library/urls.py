from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions

from rest_framework.routers import DefaultRouter
# from authors.views import AuthorModelViewSet
from todo.views import index, ProjectModelViewSet, TodoModelViewSet
from users.views import UserCustomViewSet
from rest_framework.authtoken import views

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# https://drf-yasg.readthedocs.io/en/stable/
schema_view = get_schema_view(
    openapi.Info(
        title="Project library",
        default_version='0.1',
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


router = DefaultRouter()
# router.register('authors', AuthorModelViewSet)
router.register('users', UserCustomViewSet)
router.register('projects', ProjectModelViewSet)
router.register('project_todos', TodoModelViewSet)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/', include(router.urls)),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),
]

