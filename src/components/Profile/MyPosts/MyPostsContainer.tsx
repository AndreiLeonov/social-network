import React from "react";
import {addPostActionCreator, UpdateNewPostActionCreator} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state: any) => {
    return {
        posts: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateNewPostText: (text: string) => {
            dispatch(UpdateNewPostActionCreator(text));
        },
        addPosts: () => {
            dispatch(addPostActionCreator());
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
