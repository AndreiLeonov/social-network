import React from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";

type HeaderType = {
    isAuth: boolean
    login: string | null
    logout: () => void

}

export function Header (props: HeaderType) {
    return (
        <header className={classes.header}>
            <img src="https://c7.hotpng.com/preview/845/302/525/javascript-logo-html-comment-blog-others.jpg"/>
            <div className={classes.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
                    : <NavLink to={'/login'} >Login</NavLink>
                }
            </div>
        </header>
    );
}
