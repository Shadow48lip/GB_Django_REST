import React from "react";
import {Link, Routes, Route, useParams} from "react-router-dom";
import ToDos from "./ToDos";

const ProjectToDoList = ({todos}) => {
    const {id} = useParams();
    let filtered_items = todos.filter((item) => item.project === id)

    if (filtered_items.length > 0) {
        return (
            <div>
                Проект - {id}
                <ToDos todos={filtered_items}/>
            </div>
        )
    }
    return <div>нет записей</div>
};



const ProjectItem = ({project}) => {
    return (
        <tr key={project.id}>
            <td>
                <Link to={project.id}>{project.name}</Link>
            </td>
            <td>
                {project.users}
            </td>
            <td>
                {project.link}
            </td>
        </tr>
    )
}


const ProjectList = ({projects, todos}) => {
    return (
        <div>
            <table className="App-header">
                <thead>
                <tr>
                    <td>
                        Project name
                    </td>
                    <th>
                        Users
                    </th>
                    <th>
                        Link
                    </th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => <ProjectItem project={project}/>)}
                </tbody>
            </table>
            <Routes>
                {/*<Route path=":id" element={<ProjectToDoList/>}/>*/}
                <Route path=":id" element={<ProjectToDoList todos={todos}/>}/>
            </Routes>
        </div>
    )
}


export default ProjectList;