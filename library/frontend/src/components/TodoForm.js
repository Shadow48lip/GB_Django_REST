import React from 'react'
import {Form, Input, Select, Button, Divider, Typography} from 'antd';
import {Navigate} from "react-router-dom";


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', project: props.projects, user: 0, isFinish: false}
    }


    onFinish = (values) => {
        const is_auth = this.props.is_authenticated();
        if (is_auth === false) {
            this.onFinishFailed('Not auth');
            return;
        }
        console.log('From success:', values);
        this.props.createTodoItem(values.text, values.project, values.user);
        this.setState({'isFinish': true});
    };


    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    render() {
        if (this.state.isFinish === true) return <Navigate to="/todos"/>

        return (
            <div>
                <Divider><Typography.Title level={3}>Новая заметка к проекту</Typography.Title></Divider>
                <Form name="basic" labelCol={{span: 9,}} wrapperCol={{span: 5,}}
                      initialValues={{remember: false,}}
                      onFinish={this.onFinish}
                      onFinishFailed={this.onFinishFailed}
                      autoComplete="off"
                >
                    <Form.Item label="Текст заметки" name="text"
                               rules={[{required: true, message: 'Please input your text!',},]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Проект" name="project" rules={[{required: true, message: 'Выберите проект!',},]}>
                        <Select defaultValue='Выберите проект'>
                            {this.props.projects.map((item)=><Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Пользователь" name="user" rules={[{required: true, message: 'Выберите пользователя!',},]}>
                        <Select defaultValue='Выберите пользователя'>
                            {this.props.users.map((item)=><Select.Option value={item.id} key={item.id}>{item.username}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 9, span: 5,}}>
                        <Button type="primary" htmlType="submit">Сохранить новый</Button>
                    </Form.Item>
                </Form>
            </div>
        )


    }
}

export default TodoForm;