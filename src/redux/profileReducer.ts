import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

export type PostsDataType = {
    id: number
    message: string
    likeCounter: number
}

export type ProfilePageType = {
    postsData: Array<PostsDataType>
}

export type AddPostActionType = {
    type: 'ADD-POST'
    newPostData: string
}

export type UpdateNewPostActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

export type SetUserProfileType = {
    type: 'SET_USER_PROFILE'
    profile: any
}

export type SetUserStatusType = {
    type: 'SET_USER_STATUS'
    status: string
}

export type ActionsType =
    | ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof SetUserProfile>
    | ReturnType<typeof SetUserStatus>

let initialState = {
    postsData: [
        {id: 1, message: 'Hi!!!', likeCounter: 12},
        {id: 2, message: "It's my first post!", likeCounter: 10},
        {id: 3, message: "How a u dudes?", likeCounter: 7}
    ],
    profile: null,
    status: '',
}

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsType) => {

    switch (action.type) {
        case ADD_POST: {
            const newPost: PostsDataType = {
                id: new Date().getTime(),
                message: action.newPostData,
                likeCounter: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost ],
                newPostText: ""
            };
        }
        case SET_USER_PROFILE: {
            return  {
                ...state,
                profile: action.profile
            };
        }
        case SET_USER_STATUS: {
            return  {
                ...state,
                status: action.status
            };
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostData: string): AddPostActionType => {
    return {
        type: ADD_POST,
        newPostData
    }
}

export const SetUserProfile = (profile: any): SetUserProfileType => {
    return {
        type: SET_USER_PROFILE,
        profile: profile
    }
}

export const SetUserStatus = (status: string): SetUserStatusType => {
    return {
        type: SET_USER_STATUS,
        status: status
    }
}

//Thunk

export const getUserProfile = (userId: number) => {
    return (dispatch: any) => {
        profileAPI.getProfile(userId)
            .then(response => {
                dispatch(SetUserProfile(response.data));
            });

    }
}

export const getUserStatus = (userId: number) => {
    return (dispatch: any) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(SetUserStatus(response.data));
            });

    }
}

export const updateUserStatus = (status: string) => {
    return (dispatch: any) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(SetUserStatus(status));
                }
            });

    }
}