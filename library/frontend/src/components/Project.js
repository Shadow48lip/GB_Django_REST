import React from "react";
import {Link, Routes, Route, useParams} from "react-router-dom";
import {Table} from 'antd';

import ToDos from "./ToDos";

const columns = [
    {
        title: 'Name',
        dataIndex: 'href',
        key: 'key',
        // render: (text) => <Link to={text}>{text}</Link>
    },
    {
        title: 'users',
        dataIndex: 'users',
        key: 'users',
    },
    {
        title: 'External link',
        dataIndex: 'link',
        key: 'extlink',
    },
]

const ProjectToDoList = ({todos}) => {
    const {id} = useParams();
    console.log(todos)
    let filtered_items = todos.filter((item) => item.project.id === id)
    todos.map((todo_line) => todo_line.key = todo_line.id)

    if (filtered_items.length > 0) {
        return (
            <div>
                Проект - {filtered_items[0]['project']['name']}
                <ToDos todos={filtered_items}/>
            </div>
        )
    }
    return <div>! нет записей !</div>
};

const ProjectList = ({projects, todos}) => {
    // Через функцию заменяем элемент name на ссылку
    // projects.map((project) => project.name = <Link to={project.id}>{project.name}</Link>)
    projects.map((project) => project.href = <Link to={project.id}>{project.name}</Link>)
    projects.map((project) => project.key = project.id)

    return (
        <div>
            <Table columns={columns} dataSource={projects} />
            <Routes>
                <Route path=":id" element={<ProjectToDoList todos={todos}/>}/>
            </Routes>
        </div>
    )
}

// const ProjectItem = ({project}) => {
//     return (
//         <tr key={project.id}>
//             <td>
//                 <Link to={project.id}>{project.name}</Link>
//             </td>
//             <td>
//                 {project.users}
//             </td>
//             <td>
//                 {project.link}
//             </td>
//         </tr>
//     )
// }


// const ProjectList = ({projects, todos}) => {
//     return (
//         <div>
//             <table className="App-header">
//                 <thead>
//                 <tr>
//                     <td>
//                         Project name
//                     </td>
//                     <th>
//                         Users
//                     </th>
//                     <th>
//                         Link
//                     </th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {projects.map((project) => <ProjectItem project={project}/>)}
//                 </tbody>
//             </table>
//             <Routes>
//                 {/*<Route path=":id" element={<ProjectToDoList/>}/>*/}
//                 <Route path=":id" element={<ProjectToDoList todos={todos}/>}/>
//             </Routes>
//         </div>
//     )
// }


export default ProjectList;