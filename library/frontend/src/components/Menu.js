import React from "react";
import {Link} from "react-router-dom";
import {Menu, Row, Col, Button} from 'antd'
import {
    PushpinOutlined,
    FundProjectionScreenOutlined,
    UserOutlined,
    SnippetsOutlined,
    LoginOutlined
} from '@ant-design/icons';


const MenuContent = (props) => {
    const is_authenticated = props.is_authenticated();
    // console.log(props)

    return (
        <Row>
            <Col xs={24} md={{span: 16, offset: 4}}>
                <nav>
                    <Menu mode="horizontal">
                        <Menu.Item key="main" icon={<PushpinOutlined/>}>
                            <Link to='/'>Главная</Link>
                        </Menu.Item>
                        <Menu.Item key="projects" icon={<FundProjectionScreenOutlined/>}>
                            <Link to='/projects'>Список проектов</Link>
                        </Menu.Item>
                        <Menu.Item key="todos" icon={<SnippetsOutlined/>}>
                            <Link to='/todos'>Список заметок</Link>
                        </Menu.Item>
                        <Menu.Item key="users" icon={<UserOutlined/>}>
                            <Link to='/users'>Пользователи</Link>
                        </Menu.Item>
                        <Menu.Item key="login" icon={<LoginOutlined/>}>
                            {is_authenticated ? <Button type="text" onClick={() => props.logout()}>Выйти из {props.auth_login}</Button> : <Link to='/login'>Войти</Link>}
                        </Menu.Item>
                    </Menu>
                </nav>
            </Col>
        </Row>
    )

}

export default MenuContent;