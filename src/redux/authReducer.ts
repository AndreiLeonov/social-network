const SET_USER_DATA = "SET_USER_DATA";

type SetUserDataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetUserDataActionCreatorType = {
    type: 'SET_USER_DATA',
    data: SetUserDataType
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
                ...state, ...action.data, isAuth: true
            }
        default:
            return state;
    }
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataActionCreatorType => {
    return {
        type: 'SET_USER_DATA',
        data: {
            id,
            email,
            login,
            isAuth
        }
    }
}
