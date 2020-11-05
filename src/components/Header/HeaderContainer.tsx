import React from "react";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/authReducer";
import {AppStateType} from "../../redux/redux-store";
import {Header} from "./Header";

type HeaderContainerType = {
    getAuthUserData: () => void
    isAuth: boolean
    login: string | null
    logout: () => void
}

class HeaderContainer extends React.Component<HeaderContainerType> {

    componentDidMount() {
        this.props.getAuthUserData();
    }

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);