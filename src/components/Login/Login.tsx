import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from "../../ utilities/validators";
import {Input} from "../common/FormControl/FormControl";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const maxLength20 = maxLengthCreator(20);

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Input} name={"login"} placeholder={"LOGIN"} validate={[required, maxLength20]}/>
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

export const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}