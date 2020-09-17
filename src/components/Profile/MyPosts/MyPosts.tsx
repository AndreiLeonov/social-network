import React from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import { PostsDataType } from "../../../redux/profileReducer";

type MyPostsComponentType = {
    posts: Array<PostsDataType>
    newPostText: string
    updateNewPostText: (text: string) => void
    addPosts: () => void
}

export function MyPosts(props: MyPostsComponentType) {

    let postsElements = props.posts.map((p: PostsDataType) => <Post id={p.id} message={p.message} likeCounter={p.likeCounter}/>);

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
            props.addPosts();
    }

    let onPostChange = () => {
        let text = newPostElement.current?.value;
        if (text) {
        props.updateNewPostText(text);
        }
    }

    return (
        <div className={classes.PostsBlock}>
            <h3>my posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} />
                </div>
                <div>
                    <button className={classes.ButtonStyle} onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={classes.PostsStyle}>
                {postsElements}
            </div>
        </div>
    );
}
