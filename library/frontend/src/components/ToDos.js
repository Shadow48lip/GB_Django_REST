import React from "react";
import {Table} from 'antd';

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
]

const ToDotList = ({todos}) => {
   return (
       <Table columns={columns} dataSource={todos} />
   )
}

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