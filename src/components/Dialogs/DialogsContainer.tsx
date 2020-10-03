import React from "react";
import {updateNewMessageDataCreator, sendMessageCreator} from "../../redux/messagesReducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirectHoc";
import { Dialogs } from "./Dialogs";
import {compose} from "redux";

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


// let AuthRedirectComponent = withAuthRedirect(Dialogs)
// export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose<React.ComponentType>(
    connect<any>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);


