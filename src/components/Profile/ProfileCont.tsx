import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirectHoc";
import {compose} from "redux";

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
            userId = this.props.id;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {


        return (
            <Profile
                {...this.props}
                profile = {this.props.profile}
                status = {this.props.status}
                updateStatus = {this.props.updateUserStatus}
            />
        );

    }

}

// let AuthRedirectComponent = withAuthRedirect(ProfileCont);

let mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    id: state.auth.id,
    isAuth: state.auth.isAuth,
});

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
// export default connect<any>(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);

export default compose<React.ComponentType>(
    connect<any>(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect
)(ProfileCont);