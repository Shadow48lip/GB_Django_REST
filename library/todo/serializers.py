from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer, StringRelatedField, \
    PrimaryKeyRelatedField
from .models import Project, Todo
from users.serializers import UserModelSerializer


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
    project = ProjectModelSerializer()

    class Meta:
        model = Todo
        fields = '__all__'


class TodoModelSerializerBase(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
