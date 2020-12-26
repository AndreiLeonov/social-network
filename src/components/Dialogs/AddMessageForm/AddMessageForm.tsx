import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import { DialogFormType } from '../Dialogs';

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: React.FC<InjectedFormProps<DialogFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
            {createField<DialogFormKeysType>("Enter your message", "newMessageBody", [required, maxLength50], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

//types 
type DialogFormKeysType = Extract<keyof DialogFormType, string >
type PropsType = {}

//export
export default reduxForm<DialogFormType>({form: 'dialog-add-message-form'})(AddMessageForm);
