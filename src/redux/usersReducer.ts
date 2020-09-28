import {usersAPI} from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

export type UsersPageType = {
    users: Array<UsersDataType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

export type UsersDataType = {
    id: number
    followed: boolean
    name: string
    status: string
    location: LocationDataType
    photos: photos
}

type LocationDataType = {
    city: string
    country: string
}

type photos = {
    small: string
    large: string
}

export type ActionsType = ReturnType<typeof followSuccess> |
    ReturnType<typeof unfollowSuccess> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof setIsFetching> |
    ReturnType<typeof setIsFollowingProgress>


type SetUsersType = {
    type: 'SET_USERS'
    users: Array<UsersDataType>
}

type SetCurrentPageType = {
    type: 'SET_CURRENT_PAGE'
    currentPage: number
}

type setTotalUsersCountType = {
    type: 'SET_TOTAL_USERS_COUNT'
    totalCount: number
}

type UnfollowUsersType = {
    type: 'UNFOLLOW'
    userId: number
}

type FollowUsersType = {
    type: 'FOLLOW'
    userId: number
}

export type ToggleIsFetchingType = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}

type ToggleIsFollowingProgressType = {
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS'
    isFetching: boolean
    userId: number
}


export const usersReducer = (state: UsersPageType = initialState, action: ActionsType) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
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
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

//Action Creator

export const followSuccess = (userId: number): FollowUsersType => {
    return {
        type: FOLLOW,
        userId: userId
    }
}

export const unfollowSuccess = (userId: number): UnfollowUsersType => {
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

export const setIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressType => {
    return {
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching: isFetching,
        userId: userId
    }
}

//Thunks

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(setIsFetching(true));
        usersAPI.getUsers(currentPage,  pageSize)
            .then(data => {
                dispatch(setIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            });
    }
}

export const follow = (userId: number) => {
    return (dispatch: any) => {
        dispatch(setIsFollowingProgress(true, userId));
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(setIsFollowingProgress(false, userId));
            });
    }
}

export const unfollow = (userId: number) => {
    return (dispatch: any) => {
        dispatch(setIsFollowingProgress(true, userId));
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(setIsFollowingProgress(false, userId));
            });
    }
}

//Добавить HeaderContainer, ProfileContainer и другие ? : вынести в API и зарефакторить в Санку