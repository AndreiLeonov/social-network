import React from "react";
import {updateNewMessageDataCreator, sendMessageCreator} from "../../redux/messagesReducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";

const mapStateToProps = (state: any) => {
    return {
        messagesPage: state.messagesPage,
        Auth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateNewMessageData: (newMessageText: string) => {
            dispatch(updateNewMessageDataCreator(newMessageText));
        },
        sendMessage: () => {
            dispatch(sendMessageCreator());
        },
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);


