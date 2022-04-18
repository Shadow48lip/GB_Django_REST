import React from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import {BACKEND_API_URL} from "./components/Constans";
import ProjectList from "./components/Project";
import UserList from "./components/User";
import FooterContent from "./components/Footer";
import MenuContent from "./components/Menu";
import MainPage from "./components/Main";
import NotFound from "./components/NotFound";
import ToDotList from "./components/ToDos";
import HeaderContent from "./components/Header";
import LoginForm from "./components/Auth";
import TodoForm from "./components/TodoForm";
import ProjectForm from "./components/ProjectForm";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'projects': [],
            'users': [],
            'todos': [],
            'token': '',
            'auth_login': '',
        }
    }


    set_token(token, auth_login) {
        const cookies = new Cookies()
        cookies.set('token', token, {path: '/', maxAge: 18000}) // 5 hour
        cookies.set('auth_login', auth_login, {path: '/', maxAge: 18000})
        this.setState({'token': token}, () => this.load_data())
        this.setState({'auth_login': auth_login})
    }

    is_authenticated() {
        return this.state.token !== ''
        // return true
        // return this.state.token
    }

    logout() {
        this.set_token('', '')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const auth_login = cookies.get('auth_login')
        if (token !== undefined) {
            this.setState({'token': token}, () => this.load_data())
            this.setState({'auth_login': auth_login})
        } else {
            // когда чистые куки
            this.load_data()
        }
    }

    get_token(username, password) {
        console.log(username)
        axios.post(BACKEND_API_URL + '/api-token-auth/', {
            username: username,
            password: password
        })
            .then(response => {
                this.set_token(response.data['token'], username)
                console.log(response.data)
            }).catch(error => {
            console.log(error);
            if (error.response && error.response.status === 400) {
                alert('Неверный логин или пароль')
            } else {
                alert('Неизвестная ошибка')
            }
        })
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()

        axios.get(BACKEND_API_URL + '/api/projects/', {headers})
            .then(response => {
                const projects = response.data.results
                // console.log(projects)
                this.setState({'projects': projects})
            }).catch(error => {
            this.setState({'projects': []})
        })

        axios.get(BACKEND_API_URL + '/api/project_todos/', {headers})
            .then(response => {
                const todos = response.data.results;
                this.setState({'todos': todos})
            }).catch(error => {

            this.setState({'todos': []})
            console.log(error)
        })


        axios.get(BACKEND_API_URL + '/api/users/', {headers})
            .then(response => {
                const users = response.data.results
                // console.log(response)
                this.setState({'users': users})
            }).catch(error => {
            this.setState({'users': []})
            console.log(error)
        })
    }

    deleteTodoItem(id) {
        console.log('Delete Todo id ' + id)
        const headers = this.get_headers()
        axios.delete(BACKEND_API_URL + `/api/project_todos/${id}/`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    createTodoItem(text, project, user) {
        const headers = this.get_headers()
        const data = {text: text, project: project, user: user};
        axios.post(BACKEND_API_URL + `/api/project_todos/`, data, {headers})
            .then(response => {
                // по api пришел только id проекта. подсунем туда объект этого проекта для состояния
                let new_todo = response.data;
                const project_obj = this.state.projects.filter((item) => item.id === new_todo.project)[0];
                new_todo.project = project_obj;
                this.setState({todos: [new_todo, ...this.state.todos]});

            }).catch(error => console.log(error))

    }

    createProjectItem(name, link, user) {
        console.log('Create new Project');

        const headers = this.get_headers()
        const data = {name: name, link: link, users: user};
        axios.post(BACKEND_API_URL + `/api/projects/`, data, {headers})
            .then(response => {
                this.setState({projects: [...this.state.projects, response.data]});
            }).catch(error => console.log(error))

    }

    deleteProjectItem(id) {
        console.log('Delete Project id ' + id)
        const headers = this.get_headers()
        axios.delete(BACKEND_API_URL + `/api/projects/${id}/`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
        // больше не нужно вызывать this.load_data(). Этот метод сработает после
        // загрузки токена из cookies.
        // this.load_data()

    }


    render() {

        return (
            <BrowserRouter>
                <HeaderContent/>
                <MenuContent is_authenticated={() => this.is_authenticated()} logout={() => this.logout()}
                             auth_login={this.state.auth_login}/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/projects/create' element={<ProjectForm
                            users={this.state.users}
                            is_authenticated={() => this.is_authenticated()}
                            createProjectItem={(text, project, user) => this.createProjectItem(text, project, user)}
                        />}/>
                        <Route path='/projects/*'
                               element={<ProjectList
                                   projects={this.state.projects}
                                   todos={this.state.todos}
                                   deleteProjectItem={(id) => this.deleteProjectItem(id)}
                                   is_authenticated={() => this.is_authenticated()}
                               />}
                        />

                        <Route path='/todos/create' element={<TodoForm
                            projects={this.state.projects}
                            users={this.state.users}
                            is_authenticated={() => this.is_authenticated()}
                            createTodoItem={(name, link, user) => this.createTodoItem(name, link, user)}
                        />}/>
                        <Route path='/todos'
                               element={<ToDotList
                                   todos={this.state.todos}
                                   deleteTodoItem={(id) => this.deleteTodoItem(id)}
                                   is_authenticated={() => this.is_authenticated()}
                               />}
                        />
                        <Route path='/users' element={<UserList users={this.state.users}/>}/>
                        <Route path='/login' element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}
                            is_authenticated={() => this.is_authenticated()}
                        />}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </main>


                <FooterContent/>
            </BrowserRouter>
        )
    }
}

export default App;
