import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import axios from "axios";
import {SetUserProfile} from "../../redux/profileReducer";

class ProfileCont extends React.Component<any> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

export default connect(mapStateToProps, {SetUserProfile})(ProfileCont);