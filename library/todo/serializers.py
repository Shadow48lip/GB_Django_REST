from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer, StringRelatedField, PrimaryKeyRelatedField
from .models import Project, Todo


# JSON сериализация (представление) модели при выводе в API
# class ProjectModelSerializer(HyperlinkedModelSerializer):
class ProjectModelSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)
    users = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'


# class TodoModelSerializer(HyperlinkedModelSerializer):
class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
