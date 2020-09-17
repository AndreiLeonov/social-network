import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import axios from "axios";
import {SetUserProfile} from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";

class ProfileCont extends React.Component<any> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+userId)
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