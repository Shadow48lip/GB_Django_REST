import graphene
from graphene_django import DjangoObjectType
from todo.models import Project, Todo


# class Query(graphene.ObjectType):
#     hello = graphene.String(default_value="Hi!")

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(TodoType)
    todo_by_id = graphene.Field(TodoType, id=graphene.Int(required=True))
    todo_by_project_name = graphene.List(TodoType,
                                         name=graphene.String(required=False))

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        return Todo.objects.all()

    def resolve_todo_by_id(self, info, id):
        try:
            return Todo.objects.get(id=id)
        except Todo.DoesNotExist:
            return None

    def resolve_todo_by_project_name(self, info, name=None):
        todos = Todo.objects.all()
        if name:
            todos = todos.filter(project__name=name)
        return todos


class ProjectMutation(graphene.Mutation):
    class Arguments:
        link_str = graphene.String(required=True)
        id = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, link_str, id):
        project = Project.objects.get(pk=id)
        project.link = link_str
        project.save()
        return ProjectMutation(project=project)


class Mutation(graphene.ObjectType):
    update_project = ProjectMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

"""
Example
{
  allTodos {id, text 
    project {
    name
  }}
}

{
  allTodos {id, text}
  allProjects {name}
}

Alias
{
  allTodos {id, text}
  list2: allTodos {id, text}
}

related name:
{
  allProjects {
    name
    todoSet {text}
  }
}

{
  todoById(id: 2) {id text}
}

{
  todoByProjectName(name: "Строим дом") {
    id text
  }
}

mutation updateProject {
  updateProject(linkStr: "wwww", id: "cf54df87-391f-479f-bdf1-e7a894519cb3") {
    project {
      id
      name
    }
  }
}
"""
