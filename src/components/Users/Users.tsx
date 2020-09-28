import React from 'react'
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {setIsFollowingProgress, UsersDataType} from "../../redux/usersReducer";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {usersAPI} from "../../api/api";

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

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? styles.selectedPage : ""} onClick={() => {
                        props.onPageChanged(p)
                    }}>{p} </span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/'+u.id}>
                            <img className={styles.userPhoto} src={
                                u.photos.small !== null
                                    ? u.photos.small
                                    : userPhoto}/>
                                    </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some (id => id === u.id)} onClick={() => {
                                    props.setIsFollowingProgress (true, u.id );
                                    usersAPI.unfollow(u.id)
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(u.id)
                                            }
                                            props.setIsFollowingProgress(false, u.id);
                                        });
                                }}>UNFOLLOW</button>
                                : <button disabled={props.followingInProgress.some (id => id === u.id)} onClick={() => {
                                    props.setIsFollowingProgress(true, u.id);
                                    usersAPI.follow(u.id)
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.follow(u.id)
                                            }
                                            props.setIsFollowingProgress(false, u.id);
                                        });
                                }}>FOLLOW</button>}
                        </div>
                     </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
            </span>
                </div>)
            }
        </div>
    )
}