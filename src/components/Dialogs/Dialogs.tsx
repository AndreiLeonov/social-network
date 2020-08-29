import React, {ChangeEvent} from "react";
import classes from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogsItem";
import { Message } from "./Message/Message";
import {MessagesPageType} from "../../redux/store";

type DialogsComponentType = {
    updateNewMessageData: (newMessageText: string) => void
    sendMessage: () => void
    messagesPage: MessagesPageType
}

export function Dialogs(props: DialogsComponentType) {
    let state = props.messagesPage;


    let dialogsElements = state.dialogsData.map(( d ) => <DialogItem name={d.name} key={d.id} id={d.id}/> );
    let messagesElements = state.messagesData.map(( m ) => <Message message={m.message} key={m.id} id={m.id}/> );
    let newMessageData = state.newMessageData;

    const onSendMessageClick = () => {
        props.sendMessage();
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newMessageText = e.target.value;
        props.updateNewMessageData(newMessageText);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                { dialogsElements }
            </div>
            <div>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea
                            value={newMessageData}
                            onChange={onNewMessageChange}
                            placeholder="Write for send"></textarea>
                    </div>
                    <div>
                        <button onClick={ onSendMessageClick }>
                            Send message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
