import React from 'react';
import {connect} from "react-redux";
import {Users} from "./Users";
import {followAC, unfollowAC, setUsersAC, UsersDataType} from "../../redux/usersReducer";

const mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users: Array<UsersDataType>) => {
            dispatch(setUsersAC(users))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);