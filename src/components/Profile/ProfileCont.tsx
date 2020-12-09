import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {addProfilePhoto, getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirectHoc";
import {compose} from "redux";

class ProfileCont extends React.Component<any> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.id;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }

    }

    render() {


        return (
            <Profile
                {...this.props}
                isOwner ={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateUserStatus}
                addProfilePhoto={this.props.addProfilePhoto}
            />
        );

    }

}

let mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    id: state.auth.id,
    isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
    connect<any>(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, addProfilePhoto}),
    withRouter,
    withAuthRedirect
)(ProfileCont);