import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, { AppStateType } from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import { UsersPage } from './components/Users/UsersContainer';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

class App extends Component<MapStatePropsType & MapDispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error");
    }
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
                    <div className='app-wrapper'>
                        <HeaderContainer/>
                        <Navbar/>
                        <div className='app-wrapper-content'>
                            <Route exact path='/'
                                   render={ () => <Redirect to={"/profile"}/> } />

                            <Route exact path='/dialogs'
                                   render={() => <SuspendedDialogs/> }/>

                            <Route exact path='/profile/:userId?'
                                   render={() => <SuspendedProfile/>} />

                            <Route exact path='/users'
                                   render={() => <UsersPage pageTitle={"test"}/>}/>

                            <Route exact path='/login'
                                   render={() => <LoginPage/>}/>

                            <Route exact path='*' //need to fix
                                   render={() => <div>404 NOT FOUND</div> }/>
                        </div>
                    </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp:React.FC = () => {
   return <BrowserRouter >
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

//types
type MapStatePropsType = ReturnType<typeof mapStateToProps> 
type MapDispatchPropsType = {
    initializeApp: () => void
}
export default SamuraiJSApp;
