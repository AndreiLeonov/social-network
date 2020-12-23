import {getAuthUserData} from "./auth-reducer";
import { InferActionsType } from "./redux-store";

const initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case '/APP-REDUCER/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            }

        default:
            return state;
    }
}

//actions
export const actions = {
    initializedSuccess: () => ({type: '/APP-REDUCER/INITIALIZED_SUCCESS'} as const)
}

//thunk
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        });
}

//types
export type InitialStateType = typeof initialState;
export type ActionsType = InferActionsType<typeof actions>

export default appReducer;