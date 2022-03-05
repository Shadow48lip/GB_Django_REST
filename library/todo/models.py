from django.db import models
from uuid import uuid4

from users.models import User


class Project(models.Model):
    class Meta:
        verbose_name = 'проект'
        verbose_name_plural = 'проекты'

    def __str__(self):
        return self.name

    id = models.UUIDField(primary_key=True, default=uuid4)
    name = models.CharField(verbose_name='имя проекта', max_length=64)
    link = models.CharField(verbose_name='ссылка на репозиторий', max_length=128, blank=True)
    users = models.ManyToManyField(User)


class Todo(models.Model):
    class Meta:
        verbose_name = 'заметка'
        verbose_name_plural = 'заметки'

    def __str__(self):
        return f'{self.create_at} {self.text[:10]}'

    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='проект')
    text = models.TextField(verbose_name='текст заметки', blank=False)
    create_at = models.DateTimeField(verbose_name='создано', auto_now_add=True)
    update_at = models.DateTimeField(verbose_name='обновлено', auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name='активна', default=True)
