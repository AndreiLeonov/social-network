import {InferActionsType} from "./redux-store";

const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ] as Array<MessagesType>
};

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'DIALOGS_REDUCER/SEND_MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}

//actions
export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'DIALOGS_REDUCER/SEND_MESSAGE', newMessageBody} as const)
}

//types
export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type DialogsType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}

export default dialogsReducer;