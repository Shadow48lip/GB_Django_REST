from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Author


# JSON сериализация (представление) модели при выводе в API
class AuthorModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'
