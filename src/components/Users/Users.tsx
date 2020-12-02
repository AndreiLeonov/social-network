import React from 'react'
import {UsersDataType} from "../../redux/usersReducer";
import {Paginator} from '../common/Paginator/Paginator';
import {User} from "./User/User";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UsersDataType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    setIsFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: Array<number>
}

export let Users = (props: UsersPropsType) => {

    return (
        <div>
            <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}/>
            {
                props.users.map(u => <User
                    user={u}
                    followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow}
                    follow={props.follow}
                    key={u.id}/>
                )
            }
        </div>
    )
}