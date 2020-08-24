import React from "react";
import classes from './ProfileInfo.module.css';

export function ProfileInfo() {
    return (
        <div>
            <div>
                <img
                    src='https://gran-tur.com/assets/image/Blog/%D0%A2%D1%83%D1%80%D1%86%D0%B8%D1%8F/%D0%9F%D0%BB%D1%8F%D0%B6%D0%B8%20%D0%A2%D1%83%D1%80%D1%86%D0%B8%D0%B8/plyaz%20kliopatry.jpg'/>
            </div>
            <div className={classes.descriptionBlock}>
                ava + descr
            </div>
        </div>
    );
}
