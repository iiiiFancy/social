import React from 'react';
import $ from 'jquery';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../constants';
import Tilt from 'react-tilt';
import tiltImg from '../assets/images/logo.svg'
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                $.ajax({
                    url: `${API_ROOT}/login`,
                    method: 'POST',
                    data: JSON.stringify({
                        username: values.username,
                        password: values.password,
                    }),
                }).then((response) => {
                    this.props.handleLogin(response);
                }, (error) => {
                    message.error(error.responseText);
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className='ma4 mt0'>
                    <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                        <div className="Tilt-inner pa3">
                            <img className="tilt" alt='logo' src={tiltImg}/>
                        </div>
                    </Tilt>
                </div>
                <span style={{color: '#1890ff', display: 'block', fontFamily: 'Times', fontWeight: 'Bolder'}}>
                    Record your journey & Explore others
                </span>
                <br/>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to="/register">register now!</Link>
                </FormItem>
            </Form>
        );
    }
}

export const Login = Form.create()(NormalLoginForm);
