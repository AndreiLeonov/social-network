import {ResultCodeForCapcthaEnum, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from '../api/auth-api';
import {securityAPI} from '../api/security-api';
import {BaseThunkType, InferActionsTypes} from './redux-store';
import {Action, Dispatch} from 'redux';
import {FormAction} from 'redux-form/lib/actions';
import { chatAPI, ChatMessageType } from "../api/chat-api";

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/chat/SET_MESSAGES':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        case 'SN/chat/SET_STATUS':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}

export const actions = {
    setMessages: (messages: ChatMessageType[]) => ({
        type: 'SN/chat/SET_MESSAGES', payload: {messages}
    } as const),
    setStatus: (status: StatusType) => ({
        type: 'SN/chat/SET_STATUS', payload: {status}
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

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler == null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.setStatus(status))
        }
    }

    return _statusChangedHandler

}





export const startGetMessages = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status', statusChangedHandlerCreator(dispatch));
}

export const stopGetMessages = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages',newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('status',statusChangedHandlerCreator(dispatch));
}

export const sendMessages = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message);
}

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
export type StatusType = 'pending' | 'ready' | 'error'
