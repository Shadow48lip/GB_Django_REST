import React from "react";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                <li key={user.id}>{user.username}</li>
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {

    return (
        <table>
            <thead>
            <tr>
                <td>
                    User name
                </td>
                <th>
                    First name
                </th>
                <th>
                    Last Name
                </th>
                <th>
                    E-mail
                </th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => <UserItem user={user}/>)}
            </tbody>
        </table>
    )
}


export default UserList;