import React from 'react';
import {UsersDataType} from "../../redux/usersReducer";
import styles from './Users.module.css'

type UsersComponentType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UsersDataType>) => void
    users: Array<UsersDataType>
}

export const Users = (props: UsersComponentType) => {

    if (props.users.length === 0) {

        axios.get("");

        props.setUsers([
            {id: 1, photoUrl: 'https://b7.pngbarn.com/png/394/96/engineered-stone-countertop-kitchen-cabinet-granite-q-avatar-png-clip-art-thumbnail.png', followed: false, fullName: 'Sasha', status: "I am cool!", location: {city: "Minsk", country: "Belarus"} },
            {id: 2, photoUrl: 'https://b7.pngbarn.com/png/394/96/engineered-stone-countertop-kitchen-cabinet-granite-q-avatar-png-clip-art-thumbnail.png', followed: true, fullName: 'Masha', status: "no pain no gain!", location: {city: "Minsk", country: "Belarus"} },
            {id: 3, photoUrl: 'https://b7.pngbarn.com/png/394/96/engineered-stone-countertop-kitchen-cabinet-granite-q-avatar-png-clip-art-thumbnail.png', followed: false, fullName: 'Pasha', status: "xD", location: {city: "St-pi", country: "Russia"} },
            {id: 4, photoUrl: 'https://b7.pngbarn.com/png/394/96/engineered-stone-countertop-kitchen-cabinet-granite-q-avatar-png-clip-art-thumbnail.png', followed: true, fullName: 'Dasha', status: "from Russia with love!", location: {city: "Moskow", country: "Russia"} }
        ]);
    }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img className={styles.userPhoto} src={u.photoUrl}/>
                        </div>
                        <div>
                            { u.followed
                                ? <button onClick={ () => {props.unfollow(u.id)} }>UNFOLLOW</button>
                                : <button onClick={ () => {props.follow(u.id)} }>FOLLOW</button>}
                        </div>
                     </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
            </span>
                </div>)
            }
        </div>
    )
}