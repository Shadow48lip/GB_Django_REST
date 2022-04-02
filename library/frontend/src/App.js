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
import ToDos from "./components/ToDos";
import HeaderContent from "./components/Header";
import LoginForm from "./components/Auth";

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
        cookies.set('token', token)
        cookies.set('auth_login', auth_login)
        this.setState({'token': token}, ()=>this.load_data())
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
        if (token !== undefined) this.setState({'token': token}, ()=>this.load_data())
        this.setState({'auth_login': auth_login})
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

        axios.get(BACKEND_API_URL + '/api/projects/',  {headers})
            .then(response => {
                const projects = response.data.results
                // console.log(projects)
                this.setState({'projects': projects})
            }).catch(error => {
                this.setState({'projects': []})
                console.log(error)
            })

        axios.get(BACKEND_API_URL + '/api/project_todos/',  {headers})
            .then(response => {
                const todos = response.data.results
                this.setState({'todos': todos})
            }).catch(error => {
                this.setState({'todos': []})
                console.log(error)
            })


        axios.get(BACKEND_API_URL + '/api/users/',  {headers})
            .then(response => {
                const users = response.data.results
                // console.log(response)
                this.setState({'users': users})
            }).catch(error => {
                this.setState({'users': []})
                console.log(error)
            })
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
                        <Route path='/projects/*'
                               element={<ProjectList projects={this.state.projects} todos={this.state.todos}/>}/>
                        <Route path='/todos' element={<ToDos todos={this.state.todos}/>}/>
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
