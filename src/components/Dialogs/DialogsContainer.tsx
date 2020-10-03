import React from "react";
import {updateNewMessageDataCreator, sendMessageCreator} from "../../redux/messagesReducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirectHoc";
import { Dialogs } from "./Dialogs";

const mapStateToProps = (state: any) => {
    return {
        messagesPage: state.messagesPage,
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

let AuthRedirectComponent = withAuthRedirect(Dialogs)

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);


