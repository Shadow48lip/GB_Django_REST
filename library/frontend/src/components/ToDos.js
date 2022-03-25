import React from "react";

const ToDoItem = ({todo}) => {
   return (
       <tr>
           <td>
               {todo.text}
           </td>
           <td>
               {todo.user}
           </td>
       </tr>
   )
}

const ToDotList = ({todos}) => {
   return (

       <table className="App-header">
            <thead>
            <tr>
                <th>
                    text
                </th>
                <th>
                    User
                </th>
            </tr>
            </thead>
           <tbody>
           {todos.map((todo) => <ToDoItem todo={todo} />)}
           </tbody>
       </table>
   )
}


export default ToDotList;