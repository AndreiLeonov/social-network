import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

export function Profile(props: any) {

    return (
        <div>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus = {props.updateUserStatus}
                addProfilePhoto = {props.addProfilePhoto}

            />
            <MyPostsContainer />
        </div>
    );
}
