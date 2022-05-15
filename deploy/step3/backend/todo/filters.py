from django_filters import rest_framework as filters, DateTimeFromToRangeFilter

from todo.models import Project, Todo

'''
Операторы сравнения в Django

contains - Регистрозависимая проверка на вхождение. 
    Entry.objects.get(headline__contains='Lennon')
    LIKE '%Lennon%'

exact - “Точное” совпадение.
iexact - Регистронезависимое совпадение.
gt - больше чем
gte - больше или равно
lt - меньше чем
lte - меньше ли равно
'''


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class TodoFilter(filters.FilterSet):
    project = filters.ModelChoiceFilter(queryset=Project.objects.all())
    create_at = DateTimeFromToRangeFilter() # https://django-filter.readthedocs.io/en/latest/ref/filters.html?highlight=date%20interval#daterangefilter

    class Meta:
        model = Todo
        fields = ['project', 'create_at']
