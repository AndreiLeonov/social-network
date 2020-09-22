import React from "react";
import classes from './Post.module.css';
import { PostsDataType } from "../../../../redux/profileReducer";
import userPhoto from "../../../../assets/images/user.png";

function Post (props: PostsDataType) {
    return (
        <div>
            <div className={classes.item}>
                <img
                    src={userPhoto}/>
                {props.message}
                <div>
                    <span>Likes:</span>
                    {props.likeCounter}
                </div>
            </div>
        </div>
    );
}

export default Post