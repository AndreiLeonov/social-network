import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FilterType, followTC, requestUsers, unfollowTC } from '../../redux/users-reducer';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UsersSearchForm } from './UsersSearchForm';

type PropsType = { }

export const Users: React.FC<PropsType> = (props) => {

    React.useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter));
    }, [])

    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        history.push({
            pathname:"/users",
            search:`?term=${filter.term}&friend=${filter.friend}`
        })
    }, [filter])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    }
    const follow = (userId: number) => {
        dispatch(followTC(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowTC(userId))
    }

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged} />

        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount} pageSize={pageSize} />
        <div>
            {
                users.map(u => <User user={u}
                    followingInProgress={followingInProgress}
                    key={u.id}
                    unfollow={unfollow}
                    follow={follow}
                />
                )
            }
        </div>
    </div>
}
