import React from "react";
import classes from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import { ProfileDataEditForm } from "./ProfileDataForm";

export function ProfileInfo(props: any) {

    const [editMode, setEditMode] = React.useState(false);

    const editModeOn = () => {
        setEditMode(true);
    }

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
                <div><img src={props.profile.photos.large || userPhoto} className={classes.MainPhoto}/></div>
                {/*<div><img src={props.profile.photos.small}/></div>*/}
                {props.isOwner && <input type={"file"} onChange={addPhoto}/>}
                <div>
                    <b> Статус:
                        <ProfileStatusWithHooks
                            status={props.status}
                            updateStatus={props.updateStatus}
                        />
                    </b>
                </div>
                { editMode? <ProfileDataEditForm profile={props.profile}/> : <ProfileData profile={props.profile} isOwner={props.isOwner} editModeOn={editModeOn}/>}
            </div>
        </div>
    );
}

const ProfileData = (props: any) => {
    return <div>
        {props.isOwner && <div><button onClick={props.editModeOn}>edit</button></div>}
        <p>{props.profile.fullName}</p>
        <p>UserId: {props.profile.userId}</p>
        <p>Ищу работу: {props.profile.lookingForAJob ? 'да' : 'нет'}</p>
        {props.profile.lookingForAJob && <div><b>Навыки: </b>{props.lookingForAJobDescription}</div>}
        <div>
            <b>Contacts</b>: {
            Object
                .keys(props.profile.contacts)
                .map((key) => {
                    return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                })}
        </div>
    </div>
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
export const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={classes.contacts}><b>{contactTitle}</b>: {contactValue}</div>
}