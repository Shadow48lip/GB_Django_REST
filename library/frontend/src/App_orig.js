import React from "react";
import axios from "axios";
import './App.css';
import ProjectList from "./components/Project";
import UserList from "./components/User";
import FooterContent from "./components/Footer";
import MenuContent from "./components/Menu";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'projects': [],
            'users': [],
        }
    }

    componentDidMount() {
        // const authors = [
        //     {
        //         'first_name': 'Фёдор',
        //         'last_name': 'Достоевский',
        //         'birthday_year': 1821
        //     },
        //     {
        //         'first_name': 'Александр',
        //         'last_name': 'Грин',
        //         'birthday_year': 1880
        //     },
        // ]
        // this.setState(
        //     {
        //         'authors': authors
        //     }
        // )
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
            <div className="App">
                <MenuContent/>
                Project list
                <header className="App-header">
                    <ProjectList projects={this.state.projects}/>
                </header>


                User list
                <header className="App-header">
                    <UserList users={this.state.users}/>
                </header>

                <FooterContent/>

            </div>
        )
    }
}

export default App;
