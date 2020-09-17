const UPDATE_NEW_MESSAGE_DATA = "UPDATE-NEW-MESSAGE-DATA";
const SEND_MESSAGE = "SEND-MESSAGE"

export type MessagesPageType = {
    dialogsData: Array<DialogsDataType>
    messagesData: Array<MessagesDataType>
    newMessageData: string
}

export type MessagesDataType = {
    id: number
    message: string
}

export type DialogsDataType = {
    id: number
    name: string
}

type SendMessageType = {
    type: "SEND-MESSAGE"
}

type UpdateNewMessageDataType = {
    type: 'UPDATE-NEW-MESSAGE-DATA'
    newMessageText: string
}

type ActionsType = SendMessageType | UpdateNewMessageDataType

let initialState = {
    dialogsData: [
        {id: 1, name: 'Sasha'},
        {id: 2, name: 'Pasha'},
        {id: 3, name: 'Dima'},
        {id: 4, name: 'Sveta'},
        {id: 5, name: 'Olya'},
        {id: 6, name: 'Viktor'},
        {id: 7, name: 'Kolya'},
        {id: 8, name: 'Alex'}
    ],
    messagesData: [
        {id: 1, message: 'Yo'},
        {id: 2, message: 'Hi'},
        {id: 3, message: 'how a u?'},
        {id: 4, message: 'ok'},
        {id: 5, message: 'great!'}
    ],
    newMessageData: ''
}

export const messagesReducer = (state: MessagesPageType = initialState, action: ActionsType) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_DATA:
            return {
                ...state,
                newMessageData: action.newMessageText
            };

        case SEND_MESSAGE:
            let newMessageText = state.newMessageData;
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: newMessageText}],
                newMessageData: ""
            };

        default:
            return state;
    }
}

export const sendMessageCreator = (): SendMessageType => {
    return {
        type: SEND_MESSAGE
    }
}
export const updateNewMessageDataCreator = (newText: string): UpdateNewMessageDataType => {
    return {
        type: UPDATE_NEW_MESSAGE_DATA,
        newMessageText: newText
    }
}