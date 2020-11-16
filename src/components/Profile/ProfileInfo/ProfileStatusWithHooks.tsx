import React, { useState } from "react";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

type ProfileStateType = {
    editMode: boolean,
    status: string
}

export const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onStatusChange = (e: any) => {
        setStatus(e.currentTarget.value);
    }

        return (
            <>
                { !editMode &&
                    <div>
                        <span onDoubleClick={activateEditMode}>{props.status || "---"}</span>
                    </div>
                }
                {editMode &&
                    <div>
                        <input onChange={onStatusChange} autoFocus={true} onBlur={deActivateEditMode} value={status}/>
                    </div>
                }
            </>
        );
    }


