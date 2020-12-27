import React from 'react';
import s from '../MyPosts.module.css';
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { createField, GetStringKeys, Input } from '../../../common/FormsControls/FormsControls';
import { LoginFormValueType } from '../../../Login/Login';
import { required } from '../../../../utils/validators/validators';



const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>("Post", "newPostText", [required], Input)}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({ form: 'profile-add-post' })(AddPostForm)

//types 
export type AddPostFormValuesType = {
    newPostText: string
}

type PropsType = {


}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>