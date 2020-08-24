import {profileReducer} from "./profileReducer";
import { messagesReducer } from "./messagesReducer";
import { FollowUsersType, UnfollowUsersType, SetUsersType } from "./usersReducer";

let store: StoreType = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: 'Hi!!!', likeCounter: 12},
                {id: 2, message: "It's my first post!", likeCounter: 10},
                {id: 3, message: "How a u dudes?", likeCounter: 7}
            ],
            newPostText: 'SOME TEXT'
        },
        messagesPage: {
            dialogsData: [
                {id: 1, name: 'Sasha'},
                {id: 2, name: 'Pasha'},
                {id: 3, name: 'Dima'},
                {id: 4, name: 'Sveta'},
                {id: 5, name: 'Olya'},
                {id: 6, name: 'Viktor'},
                {id: 7, name: 'Kolya'},
                {id: 8, name: 'Alex'}
            ],
            messagesData: [
                {id: 1, message: 'Yo'},
                {id: 2, message: 'Hi'},
                {id: 3, message: 'how a u?'},
                {id: 4, message: 'ok'},
                {id: 5, message: 'great!'}
            ],
            newMessageData: ''
        }
    },
    getState () {
        return this._state
    },
    _callSubscriber () {
        console.log('state changed')
    },
    subscribe (observer: () => void ) {
        this._callSubscriber = observer;
    },
    dispatch (action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action);

        this._callSubscriber();

    }
}

export type MessagesDataType = {
    id: number
    message: string
}

export type DialogsDataType = {
    id: number
    name: string
}

export type PostsDataType = {
    id: number
    message: string
    likeCounter: number
}

export type ProfilePageType = {
    postsData: Array<PostsDataType>
    newPostText: string
}

export type MessagesPageType = {
    dialogsData: Array<DialogsDataType>
    messagesData: Array<MessagesDataType>
    newMessageData: string
}

export type RootStateType = {
    profilePage: ProfilePageType
    messagesPage: MessagesPageType
}

export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsType) => void
}

export type ActionsType = AddPostActionType | UpdateNewPostActionType | UpdateNewMessageDataType | SendMessageType | FollowUsersType | UnfollowUsersType | SetUsersType

export type AddPostActionType = {
    type: 'ADD-POST'
}

export type UpdateNewPostActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

export type UpdateNewMessageDataType = {
    type: 'UPDATE-NEW-MESSAGE-DATA'
    newMessageText: string
}



export type SendMessageType = {
    type: "SEND-MESSAGE"
}

export default store;