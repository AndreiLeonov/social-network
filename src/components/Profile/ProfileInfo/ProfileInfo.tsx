import React from "react";
import classes from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import { ProfileStatus } from "./ProfileStatus";


export function ProfileInfo(props: any) {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <p>{props.profile.fullName}</p>
                <p>UserId: {props.profile.userId}</p>
                <div><img src={props.profile.photos.small}/></div>
                <div><img src={props.profile.photos.large}/></div>
                <p>Ищу работу: {props.profile.lookingForAJob === true ? 'да' : 'нет'}</p>
                <div>
                    <ProfileStatus
                        status={'YO!!'}/>
                </div>
            </div>
        </div>
    );
}
