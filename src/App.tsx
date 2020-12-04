import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import ProfileCont from './components/Profile/ProfileCont';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {News} from "./components/News/News";
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Login from './components/Login/Login';
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/appReducer"
import {compose} from "redux";
import {Preloader} from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";

class App extends React.Component<any> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        } else

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer/>
                           }/>
                    <Route
                        path='/profile/:userId?' // userId - параметр для того, чтобы взять id пользователя для withRouter и далее отрисовать его профиль; ? - делает параметр необязательным
                        render={() => <ProfileCont/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state: any) => ({
    initialized: state.app.initialized
})

let AppContainer =  compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const MainApp = (props: any) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp

