from rest_framework import mixins, permissions
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerExtented


# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer

# Только возможность просмотра списка и каждого пользователя в отдельности, можно вносить изменения
class UserCustomViewSet(mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.ListModelMixin,
                        GenericViewSet):
    # queryset = User.objects.all()
    queryset = User.objects.get_queryset().order_by('-id')
    # serializer_class = UserModelSerializer
    permission_classes = [permissions.IsAuthenticated]

    # в зависимости от версии API применяется разные сериалайзеры
    def get_serializer_class(self):
        if self.request.version == '2':
            return UserModelSerializerExtented
        return UserModelSerializer



