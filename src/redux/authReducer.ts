import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SOCIAL-NETWORK/AUTH/SET_USER_DATA";

type SetUserDataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetUserDataActionCreatorType = {
    type: 'SOCIAL-NETWORK/AUTH/SET_USER_DATA',
    payload: SetUserDataType
}

type ActionsType = SetUserDataActionCreatorType


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state: SetUserDataType = initialState, action: ActionsType) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state, ...action.payload
            }
        default:
            return state;
    }
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataActionCreatorType => {
    return {
        type: 'SOCIAL-NETWORK/AUTH/SET_USER_DATA',
        payload: {
            id,
            email,
            login,
            isAuth
        }
    }
}

//Thunk
export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.authMe();
    if (response.data.resultCode === 0) {
        let {id, email, login, isAuth} = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        let messageError = response.data.messages.length > 0
            ? response.data.messages[0]
            : "Something wrong!"
        dispatch(stopSubmit("login", {_error: messageError}));
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        let response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}
