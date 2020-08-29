import React from 'react';
import {UsersDataType} from "../../redux/usersReducer";
import styles from './Users.module.css'
import axios from 'axios'
import userPhoto from '../../assets/images/user.png'

type UsersComponentType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UsersDataType>) => void
    users: Array<UsersDataType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    setTotalUsersCount: (totalCount: number) => void
    setCurrentPage: (pageNumber: number) => void
}

export class Users extends React.Component<UsersComponentType>{

    // constructor(props: UsersComponentType) {
    //     super(props);
    // }

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount/this.props.pageSize);

        let pages = [];

        for (let i=1; i<=pagesCount; i++) {
            pages.push(i);
        }

        return (
        <div>
            <div>
                {pages.map(p => {
                   return <span className={this.props.currentPage === p ? styles.selectedPage : ""} onClick={ () => { this.onPageChanged(p) }}>{p} </span>
                })}
            </div>
            {
                this.props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img className={styles.userPhoto} src={
                                //u.photos.small != null ? u.photos.small :
                                userPhoto}/>
                        </div>
                        <div>
                            { u.followed
                                ? <button onClick={ () => {this.props.unfollow(u.id)} }>UNFOLLOW</button>
                                : <button onClick={ () => {this.props.follow(u.id)} }>FOLLOW</button>}
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
}


// export const Users = (props: UsersComponentType) => {
//
//     let getUsers = () => {
//         if (props.users.length === 0) {
//
//             axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
//                 props.setUsers(response.data.items);
//             });
//
//         }
//     }
//
//     return (
//         <div>
//             <button onClick={getUsers}>GET USERS</button>
//             {
//                 props.users.map(u => <div key={u.id}>
//                     <span>
//                         <div>
//                             <img className={styles.userPhoto} src={
//                                 //u.photos.small != null ? u.photos.small :
//                                 userPhoto}/>
//                         </div>
//                         <div>
//                             { u.followed
//                                 ? <button onClick={ () => {props.unfollow(u.id)} }>UNFOLLOW</button>
//                                 : <button onClick={ () => {props.follow(u.id)} }>FOLLOW</button>}
//                         </div>
//                      </span>
//                     <span>
//                         <span>
//                             <div>{u.name}</div>
//                             <div>{u.status}</div>
//                         </span>
//                         <span>
//                             <div>{"u.location.country"}</div>
//                             <div>{"u.location.city"}</div>
//                         </span>
//             </span>
//                 </div>)
//             }
//         </div>
//     )
// }