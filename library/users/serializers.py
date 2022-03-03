from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


# JSON сериализация (представление) модели при выводе в API
class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url','username', 'first_name', 'last_name', 'email')
