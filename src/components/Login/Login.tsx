import React from 'react'
import {Field, reduxForm } from 'redux-form';

export const LoginForm = (props: any) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={"input"} name={"login"} placeholder={"LOGIN"}/>
                </div>
                <div>
                    <Field component={"input"} name={"password"} type="password" placeholder={"PASSWORD"}/>
                </div>
                <div>
                    <Field component={"input"} name={"rememberMe"} type="checkbox"/>
                    запомнить
                </div>
                <div>
                    <button>ОТПРАВИТЬ</button>
                </div>
            </form>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

export const Login = () => {
    const onSubmit = (formData: any) => {
        console.log(formData)
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}