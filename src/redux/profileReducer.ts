const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

export type PostsDataType = {
    id: number
    message: string
    likeCounter: number
}

export type ProfilePageType = {
    postsData: Array<PostsDataType>
    newPostText: string
}

export type AddPostActionType = {
    type: 'ADD-POST'
}

export type UpdateNewPostActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

export type SetUserProfileType = {
    type: 'SET_USER_PROFILE'
    profile: any
}


type ActionsType = AddPostActionType | UpdateNewPostActionType | SetUserProfileType

let initialState = {
    postsData: [
        {id: 1, message: 'Hi!!!', likeCounter: 12},
        {id: 2, message: "It's my first post!", likeCounter: 10},
        {id: 3, message: "How a u dudes?", likeCounter: 7}
    ],
    newPostText: 'SOME TEXT',
    profile: null
}

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsType) => {

    switch (action.type) {
        case ADD_POST: {
            const newPost: PostsDataType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likeCounter: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost ],
                newPostText: ""
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return  {
                ...state,
                newPostText: action.newText
            };
        }
        case SET_USER_PROFILE: {
            return  {
                ...state,
                profile: action.profile
            };
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (): AddPostActionType => {
    return {
        type: ADD_POST
    }
}
export const UpdateNewPostActionCreator = (newText: string): UpdateNewPostActionType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    }
}

export const SetUserProfile = (profile: any): SetUserProfileType => {
    return {
        type: SET_USER_PROFILE,
        profile: profile
    }
}