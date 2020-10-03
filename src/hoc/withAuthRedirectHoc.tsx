import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state: any) => ({
    Auth: state.auth.isAuth
});

export const withAuthRedirect = (Component: any) => {

    class RedirectComponent extends React.Component<any, any> {
        render() {
            if (!this.props.Auth) return <Redirect to='/login'/>

            return <Component {...this.props} />
        }
    }

    let ConnectedAuthRedirectComponent = connect<any>(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
};