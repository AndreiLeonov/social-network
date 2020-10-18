import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {getAuthUserData} from "../../redux/authReducer";

type HeaderContainerType = {
    getAuthUserData: () => void
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

const mapStateToProps = (state: any) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login

    }
}

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);