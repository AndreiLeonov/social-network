import React from 'react';
import {connect} from "react-redux";
import {
    UsersDataType,
    setCurrentPage,
    setIsFollowingProgress,
    getUsers, follow, unfollow
} from "../../redux/usersReducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirectHoc";

export type UsersComponentType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    users: Array<UsersDataType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    isFetching: boolean
    setIsFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: Array<number>
    getUsers: (currentPage: number, pageSize: number)=> void
}

class UsersContainer extends React.Component<UsersComponentType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                onPageChanged={this.onPageChanged}
                setIsFollowingProgress={this.props.setIsFollowingProgress}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

const mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

let withRedirect = withAuthRedirect(UsersContainer);

export default connect(mapStateToProps, {follow, unfollow, setCurrentPage, setIsFollowingProgress, getUsers})(withRedirect);