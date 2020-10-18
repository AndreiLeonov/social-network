import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

export function Profile(props: any) {

    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus = {props.updateUserStatus}/>
            <MyPostsContainer />
        </div>
    );
}
