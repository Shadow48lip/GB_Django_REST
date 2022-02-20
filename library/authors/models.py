from uuid import uuid4
from django.db import models


class Author(models.Model):
    class Meta:
        verbose_name = 'автор'
        verbose_name_plural = 'авторы'

    def __str__(self):
        return '{} {}.'.format(self.last_name, self.first_name[:1])

    uid = models.UUIDField(primary_key=True, default=uuid4)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField()
