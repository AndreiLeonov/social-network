import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from "../../ utilities/validators";
import {Input} from "../common/FormControl/FormControl";
import { connect } from 'react-redux';
import {login} from "../../redux/authReducer";
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const maxLength20 = maxLengthCreator(20);

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Input} name={"email"} placeholder={"email"} validate={[required, maxLength20]}/>
                </div>
                <div>
                    <Field component={Input} name={"password"} type="password" placeholder={"PASSWORD"} validate={[required, maxLength20]}/>
                </div>
                <div>
                    <Field component={Input} name={"rememberMe"} type="checkbox"/>
                    запомнить
                </div>
                <div>
                    <button>ОТПРАВИТЬ</button>
                </div>
            </form>
    );
}

const LoginReduxForm = reduxForm<FormDataType>({ form: 'login' })(LoginForm)

const Login = (props: any) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to = {"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);