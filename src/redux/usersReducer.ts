import {ActionsType} from "./store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

type UsersPageType = {
    users: Array <UsersDataType>
}

export type UsersDataType = {
    id: number
    followed: boolean
    fullName: string
    status: string
    location: LocationDataType
    photoUrl: string
}

type LocationDataType = {
    city: string
    country: string
}

export type SetUsersType = {
    type: 'SET_USERS'
    users: Array<UsersDataType>
}

export type UnfollowUsersType = {
    type: 'UNFOLLOW'
    userId: number
}

export type FollowUsersType = {
    type: 'FOLLOW'
    userId: number
}


let initialState = {
    users: []
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
                users: [...state.users, ...action.users]
            }

        default:
            return state;
    }
}

export const followAC = (userId: number): FollowUsersType => {
    return {
        type: FOLLOW,
        userId: userId
    }
}

export const unfollowAC = (userId: number): UnfollowUsersType => {
    return {
        type: UNFOLLOW,
        userId: userId
    }
}

export const setUsersAC = (users: Array<UsersDataType>): SetUsersType => {
    return {
        type: SET_USERS,
        users: users
    }
}