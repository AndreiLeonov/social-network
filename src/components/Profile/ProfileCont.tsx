import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirectHoc";

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


        return (
                <Profile {...this.props} profile = {this.props.profile}  />
        );

    }

}

let AuthRedirectComponent = withAuthRedirect(ProfileCont);

let mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile,
});

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect<any>(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);