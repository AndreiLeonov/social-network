import {ResultCodeForCapcthaEnum, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from '../api/auth-api';
import {securityAPI} from '../api/security-api';
import {BaseThunkType, InferActionsTypes} from './redux-store';
import {Action, Dispatch} from 'redux';
import {FormAction} from 'redux-form/lib/actions';
import { chatAPI, ChatMessageType } from "../api/chat-api";

let initialState = {
    messages: [] as ChatMessageType[]
};

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/chat/SET_MESSAGES':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state;
    }
}

export const actions = {
    setMessages: (messages: ChatMessageType[]) => ({
        type: 'SN/chat/SET_MESSAGES', payload: {messages}
    } as const),
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler == null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.setMessages(messages))
        }
    }

    return _newMessageHandler

}

export const startGetMessages = (): ThunkType => async (dispatch) => {
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopGetMessages = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
}

export const sendMessages = (message: string): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
}

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
