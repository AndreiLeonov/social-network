import React from 'react'
import styles from "./User.module.css";
import userPhoto from "../../../assets/images/user.png";
import {NavLink} from "react-router-dom";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

type PhotosType = {
    small: string | null
    large: string | null
}

export let User = ({user, followingInProgress, unfollow, follow}: PropsType) => {
    return (
        <div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                            <img className={styles.userPhoto} src={
                                user.photos.small !== null
                                    ? user.photos.small
                                    : userPhoto}/>
                                    </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    unfollow(user.id);
                                }}>UNFOLLOW</button>
                                : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    follow(user.id);
                                }}>FOLLOW</button>}
                        </div>
                     </span>
            <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
            </span>
        </div>
    )
}