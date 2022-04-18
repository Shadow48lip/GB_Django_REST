import React from 'react'
import {Form, Input, Select, Button, Divider, Typography} from 'antd';
import {Navigate} from "react-router-dom";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isFinish: false}
    }


    onFinish = (values) => {
        const is_auth = this.props.is_authenticated();
        if (is_auth === false) {
            this.onFinishFailed('Not auth');
            return;
        }
        console.log('From success:', values);
        this.props.createProjectItem(values.name, values.link, values.user);
        this.setState({'isFinish': true});
    };


    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    onSearch = value => {
        console.log(value);
    }



    render() {
        if (this.state.isFinish === true) return <Navigate to="/projects"/>

        return (
            <div>
                <Divider><Typography.Title level={3}>Новый проект</Typography.Title></Divider>

                <Form name="basic" labelCol={{span: 9,}} wrapperCol={{span: 5,}}
                      initialValues={{remember: false,}}
                      onFinish={this.onFinish}
                      onFinishFailed={this.onFinishFailed}
                      autoComplete="off"
                >
                    <Form.Item label="Название" name="name"
                               rules={[{required: true, message: 'Введите имя проекта!',},]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Ссылка" name="link">
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Пользователь" name="user" rules={[{required: true, message: 'Выберите пользователя!',},]}>
                        <Select mode="multiple" allowClear>
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

export default ProjectForm;