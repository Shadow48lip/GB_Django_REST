from django.core.management.base import BaseCommand
from users.models import User


# Создает пользователей
class Command(BaseCommand):
    def handle(self, *args, **options):
        # User.objects.all().delete()
        super_user = User.objects.create_superuser('admin', 'django@geekshop.local', 'admin123')
        user1 = User.objects.create_user('user1', 'user1@geekshop.local', 'user123')
        user2 = User.objects.create_user('user2', 'user2@geekshop.local', 'user123')
