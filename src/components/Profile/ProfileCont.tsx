import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import axios from "axios";
import {SetUserProfile} from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";
import {usersAPI} from "../../api/api";

class ProfileCont extends React.Component<any> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        usersAPI.profile(userId)
            .then(response => {
                this.props.SetUserProfile(response.data);
            });
    }

    render() {
        return (
                <Profile {...this.props} profile = {this.props.profile}  />
        );

    }

}

let mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile
});

let WithUrlDataContainerComponent = withRouter(ProfileCont);

export default connect(mapStateToProps, {SetUserProfile})(WithUrlDataContainerComponent);