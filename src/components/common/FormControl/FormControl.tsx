import React from "react";
import styles from "./FormControl.module.css"


export const Textarea = ({input, meta: {touched, error}, ...props}: any) => {
    const showError = touched && error;
    return (
        <div className={showError? styles.error : ""}>
            <div>
                <textarea {...input} {...props}/>
            </div>
                {showError && <span>{error}</span>}
        </div>
    );
}

export const Input = ({input, meta:{touched, error}, ...props}: any) => {
    const showError = touched && error;
    return (
        <div className={showError ? styles.error : styles.noError}>
            <div>
                <input {...input} {...props}/>
            </div>
            {showError && <span>{error}</span>}
        </div>
    );
}

