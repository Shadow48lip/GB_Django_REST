from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


# JSON сериализация (представление) модели при выводе в API
class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'first_name', 'last_name', 'email')


class UserModelSerializerExtented(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')
