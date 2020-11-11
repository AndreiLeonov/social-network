import { getAuthUserData } from "./authReducer";

let initialState = {
    initialized: false,
}

export type InitialStateType = typeof initialState
type InitializedSuccessActionCreatorType = {
    type: 'INITIALIZED_SUCCESS',
}
type ActionsType = InitializedSuccessActionCreatorType

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";



export const appReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: 'INITIALIZED_SUCCESS'} as const)

//Thunk
export const initializeApp = () => (dispatch: any) => {
        let promise = dispatch(getAuthUserData());
        promise
            .then( () => {
                dispatch(initializedSuccess());
            })
}

