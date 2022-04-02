import React from 'react'
import {Navigate} from "react-router-dom";
import {Form, Input, Button, Divider} from 'antd';


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
    }

    // // работает при вводе данных
    // handleChange(event) {
    //     console.log('change '+ event.target.name + ' = ' + event.target.value)
    //     this.setState(
    //         {
    //             [event.target.name]: event.target.value
    //         }
    //     );
    // }
    //
    // handleSubmit(event) {
    //     // console.log('Submit ' + this.state.login + ' ' + this.state.password)
    //     this.props.get_token(this.state.login, this.state.password)
    //     event.preventDefault()
    // }


    onFinish = (values) => {
        // console.log('Success:', values);
        this.props.get_token(values.login, values.password)
        // values.preventDefault()
    };


    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        if (this.props.is_authenticated()) return <Navigate to="/" replace/>

        return (
            <div>
                <Divider/>
                <Form name="basic" labelCol={{span: 9,}} wrapperCol={{span: 5,}}
                      initialValues={{remember: false,}}
                      onFinish={this.onFinish}
                      onFinishFailed={this.onFinishFailed}
                      autoComplete="off"
                >
                    <Form.Item label="Имя пользователя" name="login"
                               rules={[{required: true, message: 'Please input your username!',},]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Пароль" name="password"
                               rules={[{required: true, message: 'Please input your password!',},]}>
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 9, span: 5,}}>
                        <Button type="primary" htmlType="submit">Авторизоваться</Button>
                    </Form.Item>
                </Form>
            </div>
        )


        //
        // return (
        //     <form onSubmit={(event) => this.handleSubmit(event)}>
        //         <input type="text" name="login" placeholder="login"
        //                value={this.state.login} onChange={(event) => this.handleChange(event)}/>
        //         <input type="password" name="password" placeholder="password"
        //                value={this.state.password} onChange={(event) => this.handleChange(event)}/>
        //         <input type="submit" value="Login"/>
        //     </form>
        // );
    }
}

export default LoginForm;