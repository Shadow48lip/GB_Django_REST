import React from "react";
import {Link} from "react-router-dom";

function MenuContent() {
// const MenuContent = () => {
    return (
        <nav>
            <ul className="menu-list">
                <li><Link to='/'>Главная</Link></li>
                <li><Link to='/projects'>Список проектов</Link></li>
                <li><Link to='/todos'>Список заметок</Link></li>
                <li><Link to='/users'>Список пользователей</Link></li>
            </ul>
        </nav>
    )
}

export default MenuContent;