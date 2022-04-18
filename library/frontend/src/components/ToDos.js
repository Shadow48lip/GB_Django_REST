import React from "react";
import {Table, Space, Button, Divider} from 'antd';
// import {Link} from "react-router-dom";


const ToDotList = ({todos, deleteTodoItem, is_authenticated}) => {
    // ant нужно у каждой линии свой уникальный ключ
    todos.map((todo_line) => todo_line.key = todo_line.id);

    const columns = [
        {
            title: 'Text',
            dataIndex: 'text',
            key: 'text',
        },
        {
            title: 'user ID',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button danger onClick={() => deleteTodoItem(record.id)}>Удалить</Button>
                </Space>
            ),
        },
    ]

    const authenticated = is_authenticated();

    return (
        <div>
            <Divider plain>Список записок к проектам</Divider>
            <Table columns={columns} dataSource={todos}/>
            {/*<Link to='/todos/create/'>Создать</Link>*/}
            {authenticated ? <Button type='primary' href='/todos/create/' className='margins'>Создать новую запись</Button> : ''}

        </div>
    )
}

// Вариант реализации таблицы своими руками.
// const ToDoItem = ({_todo}) => {
//    return (
//        <tr>
//            <td>
//                {_todo.text}
//            </td>
//            <td>
//                {_todo.user}
//            </td>
//        </tr>
//    )
// }

// const ToDotList = ({todos}) => {
//    return (
//
//        <table className="App-header">
//             <thead>
//             <tr>
//                 <th>
//                     text
//                 </th>
//                 <th>
//                     User
//                 </th>
//             </tr>
//             </thead>
//            <tbody>
//            {todos.map((_todo) => <ToDoItem _todo={_todo} />)}
//            </tbody>
//        </table>
//    )
// }


export default ToDotList;