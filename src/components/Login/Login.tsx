import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../redux/redux-store";

const LoginForm: React.FC<InjectedFormProps<LoginFormValueType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormKeysType>("Email", "email", [required], Input)}
            {createField<LoginFormKeysType>("Password", "password", [required], Input, {type: "password"})}
            {createField<LoginFormKeysType>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            { captchaUrl && <img src={captchaUrl} />}
            { captchaUrl &&  createField<LoginFormKeysType>("Symbols from image", "captcha", [required], Input, {}) }


            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValueType, LoginFormOwnProps>({form: 'login'})(LoginForm);

export const LoginPage: React.FC= () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const dispatch = useDispatch();

    const onSubmit = (formData: any) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}

//types 
type LoginFormOwnProps = {
    captchaUrl: string | null
}
export type LoginFormValueType = {
    password: string
    email: string
    rememberMe: boolean
    captcha: string | null
}
type LoginFormKeysType = GetStringKeys<LoginFormValueType>