import {profileAPI} from "../api/api";
export const SetUserStatus = (status: string): SetUserStatusType => {
    return {
        type: SET_USER_STATUS,
        status: status
    }
}

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SET_PROFILE_PHOTO = 'SET_PROFILE_PHOTO';

export type PostsDataType = {
    id: number
    message: string
    likeCounter: number
}

export type ProfilePageType = {
    postsData: Array<PostsDataType>
    profile: any
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

export type SetProfilePhotoType = {
    type: 'SET_PROFILE_PHOTO'
    photos: any
}

export type ActionsType =
    | ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof SetUserProfile>
    | ReturnType<typeof SetUserStatus>
    | ReturnType<typeof SetProfilePhoto>

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
                postsData: [...state.postsData, newPost],
                newPostText: ""
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SET_PROFILE_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
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

export const SetProfilePhoto = (photos: any): SetProfilePhotoType => {
    return {
        type: SET_PROFILE_PHOTO,
        photos
    }
}

//Thunk

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(SetUserProfile(response.data));
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(SetUserStatus(response.data));
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(SetUserStatus(status));
    }
}

export const addProfilePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.addPhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(SetProfilePhoto(response.data.data.photos));
    }
}
