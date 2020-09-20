import React from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";


export function Header (props: any) {
    return (
        <header className={classes.header}>
            <img src="https://c7.hotpng.com/preview/845/302/525/javascript-logo-html-comment-blog-others.jpg"/>
            <div className={classes.loginBlock}>
                {props.isAuth? props.login :
                <NavLink to={'/login'} >Login</NavLink>
                }
            </div>
        </header>
    );
}
