import React from "react";
import axios from "axios";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import ProjectList from "./components/Project";
import UserList from "./components/User";
import FooterContent from "./components/Footer";
import MenuContent from "./components/Menu";
import MainPage from "./components/Main";
import NotFound from "./components/NotFound";
import ToDos from "./components/ToDos";
import HeaderContent from "./components/Header";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'projects': [],
            'users': [],
            'todos': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                // console.log(projects)
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project_todos/')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results
                // console.log(response)
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
    }


    render() {

        return (
            <BrowserRouter>
                <HeaderContent/>
                <MenuContent/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/projects/*' element={<ProjectList projects={this.state.projects} todos={this.state.todos} />} />
                        <Route path='/todos' element={<ToDos todos={this.state.todos}/>} />
                        <Route path='/users' element={<UserList users={this.state.users}/>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <FooterContent/>
            </BrowserRouter>
        )
    }
}

export default App;
