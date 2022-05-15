from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer, StringRelatedField, \
    PrimaryKeyRelatedField
from .models import Project, Todo
from users.serializers import UserModelSerializer


# JSON сериализация (представление) модели при выводе в API
# class ProjectModelSerializer(HyperlinkedModelSerializer):
class ProjectModelSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)
    # users = PrimaryKeyRelatedField(many=True, read_only=True)

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


'''
# Обзор сериалайзеров

class Author1:

    def __init__(self, name, birthday_year):
        self.name = name
        self.birthday_year = birthday_year

    def __str__(self):
        return self.name


# Serializer преобразует сложный объект в словарь, содержащий простые типы данных, а также выполняет обратное преобразование
from rest_framework import serializers


class AuthorSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=128)
    birthday_year = serializers.IntegerField()


author = Author1('Грин', 1880)
serializer = AuthorSerializer(author)
print(serializer.data)
print(type(serializer.data))

#  вторым этапом рендер из словаря в json bytes
from rest_framework.renderers import JSONRenderer

renderer = JSONRenderer()
json_bytes = renderer.render(serializer.data)
print(json_bytes)
print(type(json_bytes))

# парсер ловит на вход json и формирует словарь Питона
from rest_framework.parsers import JSONParser
import io

stream = io.BytesIO(json_bytes)
data = JSONParser().parse(stream)
print(data)
print(type(data))

# Serializer в обратном направлении.
# На вход мы подаём данные в виде словаря python и проверяем их на валидность. Если они валидны, на их основании можно
# восстановить объект Author
serializer = AuthorSerializer(data=data)
print(serializer.is_valid())  # True
print(serializer.validated_data)  # OrderedDict([('name', 'Грин'), ('birthday_year', 1880)])
print(type(serializer.validated_data))

'''