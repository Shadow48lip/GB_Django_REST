import React from "react";
import {Link} from "react-router-dom";
import {Menu, Row, Col} from 'antd'
import {PushpinOutlined, FundProjectionScreenOutlined, UserOutlined, SnippetsOutlined} from '@ant-design/icons';


// function MenuContent() {
// const MenuContent = () => {
class MenuContent extends React.Component {

    state = {
        current: 'main',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({current: e.key});
    };

    render() {
        return (
            <Row>
                <Col xs={24} md={{span: 12, offset: 6}}>
                    <nav>
                        <Menu onClick={this.handleClick} mode="horizontal">
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
                        </Menu>
                    </nav>
                </Col>
            </Row>
        )
    }
}

export default MenuContent;