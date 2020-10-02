import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profileReducer";
import {Redirect, withRouter, RouteComponentProps} from "react-router-dom";

// type PropsParamsType = {
//     userId: number
// }
//
// type MapStatePropsType = {
//     profile: any
//     Auth: boolean
//
// }
//
// type MapDispatchPropsType = {
//     getUserProfile: (userId: number) => void
//
// }
//
// type OwnPropsType = MapStatePropsType & MapDispatchPropsType
// type PropsType = RouteComponentProps<PropsParamsType> & OwnPropsType

class ProfileCont extends React.Component<any> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.getUserProfile(userId);
    }

    render() {
        if (!this.props.Auth) {
            return <Redirect to={'/login'}/>
        }

        return (
                <Profile {...this.props} profile = {this.props.profile}  />
        );

    }

}

let mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile,
    Auth: state.auth.isAuth
});

let WithUrlDataContainerComponent = withRouter(ProfileCont);

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);