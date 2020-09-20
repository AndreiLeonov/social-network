import React from "react";
import classes from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import { DialogsDataType } from "../../../redux/messagesReducer";
import userPhoto from "../../../assets/images/user.png";

export function DialogItem(props: DialogsDataType) {
    let path = "/dialogs/" + props.id;
    return (
        <div className={classes.dialog + ' ' + classes.activeLink}>
            <img
                src={userPhoto}/>
            <div className={classes.navlink}>
                <NavLink to={path}>{props.name}</NavLink>
            </div>
        </div>
    );
}

