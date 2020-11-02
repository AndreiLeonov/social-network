import React from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import { PostsDataType } from "../../../redux/profileReducer";
import {Form, Field, reduxForm, InjectedFormProps} from "redux-form";

type MyPostsComponentType = {
    posts: Array<PostsDataType>
    newPostText: string
    addPosts: (newPostData: string) => void
}

export function MyPosts(props: MyPostsComponentType) {

    const sendPostData = (value: FormDataType) => {
        props.addPosts(value.newPostData);
    }

    let postsElements = props.posts.map((p: PostsDataType) => <Post id={p.id} message={p.message} likeCounter={p.likeCounter}/>);

    return (
        <div className={classes.PostsBlock}>
            <h3>my posts</h3>
            <MyPostsReduxForm onSubmit={sendPostData}/>
            <div className={classes.PostsStyle}>
                {postsElements}
            </div>
        </div>
    );
}

type FormDataType = {
    newPostData: string
}

const MyPostsForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component = {"textarea"}
                    name = {"newPostData"}
                    placeholder = {"Write for send"}/>
            </div>
            <div>
                <button className={classes.ButtonStyle}>Add post</button>
            </div>
        </Form>
    );
}

const MyPostsReduxForm = reduxForm<FormDataType>({ form: 'MyPostsForm' })(MyPostsForm);