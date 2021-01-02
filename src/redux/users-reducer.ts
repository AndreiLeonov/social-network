import {UserType} from "../types/types";
import {updateObjectInArray} from "../utils/object-helpers";
import {AppStateType, BaseThunkType, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";
import { APIResponseType } from "../api/api";

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array with user id
    filter: {
        term: ""
    }
};

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case "SET_USERS": {
            return {...state, users: action.users}
        }
        case "SET_CURRENT_PAGE": {
            return {...state, currentPage: action.currentPage}
        }
        case "SET_TOTAL_USERS_COUNT": {
            return {...state, totalUsersCount: action.count}
        }
        case "SET_FILTER": {
            return {...state, filter: action.payload}
        }
        case "TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}

//actions
export const actions = {
    followSuccess: (userId: number) => ({type: "FOLLOW", userId} as const),
    unfollowSuccess: (userId: number) => ({type: "UNFOLLOW", userId} as const),
    setUsers: (users: Array<UserType>) => ({type: "SET_USERS", users} as const),
    setFilter: (term: string) => ({type: "SET_FILTER", payload: {term}} as const),
    setCurrentPage: (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: "SET_TOTAL_USERS_COUNT",
        count: totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: "TOGGLE_IS_FOLLOWING_PROGRESS",
        isFetching,
        userId
    } as const),
}

//thunks
export const requestUsers = (page: number, pageSize: number, term: string) => {
    return async (dispatch: DispatchType, getState: GetStateType) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page)); 
        dispatch(actions.setFilter(term)); 

        let data = await usersAPI.getUsers(page, pageSize, term);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}
const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: (userId: number) => Promise<APIResponseType>, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
       await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    }
}

//types
export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>


export default usersReducer;