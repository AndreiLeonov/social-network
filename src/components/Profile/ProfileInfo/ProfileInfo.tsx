import React from "react";
import classes from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";

export function ProfileInfo(props: any) {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
                <img
                    src='https://gran-tur.com/assets/image/Blog/%D0%A2%D1%83%D1%80%D1%86%D0%B8%D1%8F/%D0%9F%D0%BB%D1%8F%D0%B6%D0%B8%20%D0%A2%D1%83%D1%80%D1%86%D0%B8%D0%B8/plyaz%20kliopatry.jpg'/>
            </div>
            <div className={classes.descriptionBlock}>
                <p>{props.profile.fullName}</p>
                <div><img src={props.profile.photos.small}/></div>
                <div><img src={props.profile.photos.large}/></div>
                <p>UserId: {props.profile.userId}</p>
                <p>Ищу работу: {props.profile.lookingForAJob === true ? 'да' : 'нет'}</p>
                ava + descr
            </div>
        </div>
    );
}
