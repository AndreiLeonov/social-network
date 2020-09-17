import React from "react";
import classes from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import { DialogsDataType } from "../../../redux/messagesReducer";

export function DialogItem(props: DialogsDataType) {
    let path = "/dialogs/" + props.id;
    return (
        <div className={classes.dialog + ' ' + classes.activeLink}>
            <img
                src="https://whatmessenger.ru/s3/uploads/posts/2018-07/1530544023_n6fgwzftnvg.jpg?b0a749c03fe00fd9b292c90620639415"/>
            <div className={classes.navlink}>
                <NavLink to={path}>{props.name}</NavLink>
            </div>
        </div>
    );
}

