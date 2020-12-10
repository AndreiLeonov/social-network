import React from "react";
import { Contact } from "./ProfileInfo";

export const ProfileDataEditForm = (props: any) => {
    return <form>
        <div><button onClick={props.editModeOn}>save</button></div>
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
    </form>
}