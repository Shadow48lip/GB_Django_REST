import React from 'react';
import axios from "axios";
import './App.css';
import AuthorList from "./components/Author";
import UserList from "./components/User";
import FooterContent from "./components/Footer";
import MenuContent from "./components/Menu";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': [],
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
        axios.get('http://127.0.0.1:8000/api/authors/')
            .then(response => {
                const authors = response.data
                this.setState(
                    {
                        'authors': authors
                    }
                )
            }).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
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
                Authors list
                <header className="App-header">
                    <AuthorList authors={this.state.authors}/>
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


// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload. <br/>Привет мир.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
