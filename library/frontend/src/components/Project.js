import React, {useState, useEffect} from "react";
import {Link, Routes, Route, useParams} from "react-router-dom";
import {Button, Divider, Input, Space, Table} from 'antd';

import ToDotList from "./ToDos";


const ProjectToDoList = ({todos, is_authenticated}) => {
    const {id} = useParams();
    // console.log(todos)
    let filtered_items = todos.filter((item) => item.project.id === id)

    if (filtered_items.length > 0) {
        return (
            <div>
                Проект - {filtered_items[0]['project']['name']}
                <ToDotList todos={filtered_items} is_authenticated={() => is_authenticated()}/>
            </div>
        )
    }
    return <div>! нет записей !</div>
};

const ProjectList = ({projects, todos, deleteProjectItem, is_authenticated}) => {
    // https://ru.reactjs.org/docs/hooks-state.html https://ru.reactjs.org/docs/hooks-effect.html
    const [data, setData] = useState();

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
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button danger onClick={() => deleteProjectItem(record.id)}>Удалить</Button>
                </Space>
            ),
        },
    ]
    // Через функцию заменяем элемент name на ссылку
    // projects.map((project) => project.name = <Link to={project.id}>{project.name}</Link>)
    projects.map((project) => project.href = <Link to={project.id}>{project.name}</Link>)
    projects.map((project) => project.key = project.id);

    useEffect(() => {
        // такая конструкция предотвращает перезапись стейта при поиске
        if (typeof data !== 'object' && projects.length > 0) {
            console.log('pr ' + projects);
            setData(projects);
        }
    });

    const onSearch = value => {
        console.log('search: ' + value);
        projects = projects.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        setData(projects);
    }


    return (
        <div>
            <Divider plain>Проекты</Divider>
            <Input.Search placeholder="поиск" allowClear onSearch={onSearch} style={{width: 300, margin: 10}}/>

            <Table columns={columns} dataSource={data}/>
            {is_authenticated() ?
                <Button type='primary' href='/projects/create/' className='margins'>Создать новый проект</Button> : ''}
            <Routes>
                <Route path=":id"
                       element={<ProjectToDoList todos={todos} is_authenticated={() => is_authenticated()}/>}/>
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