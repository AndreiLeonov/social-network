import {
    AddPostActionType,
    SendMessageType, SetUserProfileType,
    UpdateNewMessageDataType,
    UpdateNewPostActionType
} from "./store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

type UsersPageType = {
    users: Array <UsersDataType>
}

export type UsersDataType = {
    id: number
    followed: boolean
    name: string
    status: string
    location: LocationDataType
    photos:  {
        small: string
        large: string
    }
}

type LocationDataType = {
    city: string
    country: string
}

export type SetUsersType = {
    type: 'SET_USERS'
    users: Array<UsersDataType>
}

export type SetCurrentPageType = {
    type: 'SET_CURRENT_PAGE'
    currentPage: number
}

export type setTotalUsersCountType = {
    type: 'SET_TOTAL_USERS_COUNT'
    totalCount: number
}

export type UnfollowUsersType = {
    type: 'UNFOLLOW'
    userId: number
}

export type FollowUsersType = {
    type: 'FOLLOW'
    userId: number
}

export type ToggleIsFetchingType = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}

export type ActionsType = AddPostActionType | UpdateNewPostActionType | UpdateNewMessageDataType | SendMessageType | FollowUsersType | UnfollowUsersType | SetUsersType | SetCurrentPageType | setTotalUsersCountType | ToggleIsFetchingType | SetUserProfileType


let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true
}

export const usersReducer = (state: UsersPageType = initialState, action: ActionsType) => {

    switch (action.type) {
        case FOLLOW:
            return  {
                ...state,
                users: state.users.map (u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
            }
                    return u;
            })
            }
        case UNFOLLOW:
            return  {
                ...state,
                users: state.users.map (u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
}

export const follow = (userId: number): FollowUsersType => {
    return {
        type: FOLLOW,
        userId: userId
    }
}

export const unfollow = (userId: number): UnfollowUsersType => {
    return {
        type: UNFOLLOW,
        userId: userId
    }
}

export const setUsers = (users: Array<UsersDataType>): SetUsersType => {
    return {
        type: SET_USERS,
        users: users
    }
}

export const setCurrentPage = (currentPage: number): SetCurrentPageType => {
    return {
        type: "SET_CURRENT_PAGE",
        currentPage: currentPage
    }
}

export const setTotalUsersCount = (totalCount: number): setTotalUsersCountType => {
    return {
        type: "SET_TOTAL_USERS_COUNT",
        totalCount: totalCount
    }
}

export const setIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
    return {
        type: 'TOGGLE_IS_FETCHING',
        isFetching: isFetching
    }
}
