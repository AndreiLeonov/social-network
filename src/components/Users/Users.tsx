import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";
import { UsersSearchForm } from './UsersSearchForm';
import { FilterType, requestUsers } from '../../redux/users-reducer';
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsersFilter } from '../../redux/users-selectors';
import { useDispatch, useSelector } from 'react-redux';

type PropsType = {
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onFilterChanged: (filter: FilterType) => void
}

let Users: React.FC<PropsType> = ({users, ...props }) => {
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);

    const dispatch = useDispatch();

    const getUsers = () => {}

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));

    }

    return <div>
        <UsersSearchForm onFilterChanged={props.onFilterChanged}/>

        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount} pageSize={pageSize} />
        <div>
            {
                users.map(u => <User user={u}
                    followingInProgress={props.followingInProgress}
                    key={u.id}
                    unfollow={props.unfollow}
                    follow={props.follow}
                />
                )
            }
        </div>
    </div>
}

export default Users;