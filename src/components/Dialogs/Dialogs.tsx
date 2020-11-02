import React from "react";
import classes from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {MessagesPageType} from "../../redux/messagesReducer";
import {Redirect} from "react-router-dom"
import {Form, Field, reduxForm, InjectedFormProps} from "redux-form";


type DialogsComponentType = {
    updateNewMessageData: (newMessageText: string) => void
    sendMessage: (newMessageData: string) => void
    messagesPage: MessagesPageType
    Auth: boolean
}

export function Dialogs(props: DialogsComponentType) {

    const sendDialogMessage = (value: FormDataType) => {
        props.sendMessage(value.newMessageData);
    }

    let state = props.messagesPage;


    let dialogsElements = state.dialogsData.map((d) => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messagesData.map((m) => <Message message={m.message} key={m.id} id={m.id}/>);

    if (!props.Auth) {
        return <Redirect to={'/login'}/>;
    }
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div>
                <div>{messagesElements}</div>
                <DialogsReduxForm onSubmit={sendDialogMessage}/>
            </div>
        </div>
    );
}

type FormDataType = {
    newMessageData: string
}

const DialogsForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component = {"textarea"}
                    name = {"newMessageData"}
                    placeholder = {"Write for send"}
                />
            </div>
            <div>
                <button>
                    Send message
                </button>
            </div>
        </Form>
);
}

const DialogsReduxForm = reduxForm<FormDataType>({ form: 'DialogsForm' })(DialogsForm);