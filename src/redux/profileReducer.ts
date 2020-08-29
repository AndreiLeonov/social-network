import {AddPostActionType, PostsDataType, UpdateNewPostActionType, ProfilePageType} from "./store";
import {ActionsType} from "./usersReducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
    postsData: [
        {id: 1, message: 'Hi!!!', likeCounter: 12},
        {id: 2, message: "It's my first post!", likeCounter: 10},
        {id: 3, message: "How a u dudes?", likeCounter: 7}
    ],
    newPostText: 'SOME TEXT'
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