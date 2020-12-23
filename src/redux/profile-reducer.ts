import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {profileAPI} from "../api/profile-api";

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: "",
};

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE_REDUCER/ADD_POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case 'PROFILE_REDUCER/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'PROFILE_REDUCER/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }

        case 'PROFILE_REDUCER/DELETE_POST':
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}

        case 'PROFILE_REDUCER/SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos } as ProfileType}
        default:
            return state;
    }
}

//thunks
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}
export const updateStatus = (status: string):ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status);

        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    } catch (error) {
        // сделать красивую обработку ошибки
        alert(error.message);
    }
    
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);

    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getUserProfile(userId));
        } else throw new Error("userID can't be null");
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0] }));
        return Promise.reject(data.messages[0]);
    }
}

//actions
export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'PROFILE_REDUCER/ADD_POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'PROFILE_REDUCER/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'PROFILE_REDUCER/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'PROFILE_REDUCER/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'PROFILE_REDUCER/SAVE_PHOTO_SUCCESS', photos} as const),
}

//types
type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

//export
export default profileReducer;