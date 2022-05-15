import React from "react";
import {Table} from 'antd';

const columns = [
    {
        title: 'User',
        dataIndex: 'username',
        key: 'username',
        // sorter: (a, b) => a.username - b.username,
    },
    {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
    },
    {
        title: 'First Name',
        dataIndex: 'last_name',
        key: 'last_name',
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
    },
]

const UserList = ({users}) => {
    // console.log(users)
    return (
        <Table columns={columns} dataSource={users} />
    )
}

// const UserItem = ({user}) => {
//     return (
//         <tr>
//             <td>
//                 <li key={user.id}>{user.username}</li>
//             </td>
//             <td>
//                 {user.first_name}
//             </td>
//             <td>
//                 {user.last_name}
//             </td>
//             <td>
//                 {user.email}
//             </td>
//         </tr>
//     )
// }

// const UserList = ({users}) => {
//
//     return (
//         <table>
//             <thead>
//             <tr>
//                 <td>
//                     User name
//                 </td>
//                 <th>
//                     First name
//                 </th>
//                 <th>
//                     Last Name
//                 </th>
//                 <th>
//                     E-mail
//                 </th>
//             </tr>
//             </thead>
//             <tbody>
//             {users.map((user) => <UserItem user={user}/>)}
//             </tbody>
//         </table>
//     )
// }


export default UserList;