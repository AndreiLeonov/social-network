import React from "react";
import classes from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";


export function ProfileInfo(props: any) {
    if (!props.profile) {
        return <Preloader/>
    }

    const addPhoto = (e: any) => {
        if (e.target.files.length) {
            props.addProfilePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <p>{props.profile.fullName}</p>
                <p>UserId: {props.profile.userId}</p>
                <div><img src={props.profile.photos.small}/></div>
                <div><img src={props.profile.photos.large || userPhoto} className={classes.MainPhoto}/></div>
                {props.isOwner && <input type={"file"} onChange={addPhoto}/>}
                <p>Ищу работу: {props.profile.lookingForAJob === true ? 'да' : 'нет'}</p>
                <div>
                    <p>
                        <b> Статус:
                            <ProfileStatusWithHooks
                                status={props.status}
                                updateStatus={props.updateStatus}
                            />
                        </b>
                    </p>
                </div>
            </div>
        </div>
    );
}
