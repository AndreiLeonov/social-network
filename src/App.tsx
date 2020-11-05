import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import ProfileCont from './components/Profile/ProfileCont';
import {Route} from "react-router-dom";
import {News} from "./components/News/News";
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Login from './components/Login/Login';



function App() {

    return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={ () =>  <DialogsContainer />
                    }/>
                    <Route path='/profile/:userId?' // userId - параметр для того, чтобы взять id пользователя для withRouter и далее отрисовать его профиль; ? - делает параметр необязательным
                           render={ () =>  <ProfileCont />  }/>
                    <Route path='/news' render={ () =>  <News/>  }/>
                    <Route path='/music' render={ () =>  <Music/>  }/>
                    <Route path='/settings' render={ () =>  <Settings/>  }/>
                    <Route path='/users' render={ () =>  <UsersContainer />  }/>
                    <Route path='/login' render={ () =>  <Login />  }/>
                </div>
            </div>
    );
}

export default App;
