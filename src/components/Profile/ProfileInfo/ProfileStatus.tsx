import React from "react";

type ProfileStatusType = {
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false
    }

    activateEditMode = () => {
        debugger
        console.log("this:", this);
        this.setState( {
            editMode: true
        } )
    }

    deactivateEditMode = () => {
        this.setState( {
            editMode: false
        } )
    }


    render() {
        return (
            <>
                {
                    !this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>
                }
                {
                    this.state.editMode &&
                    <div>
                        <input onBlur={this.deactivateEditMode} autoFocus={true} value={this.props.status}/>
                    </div>
                }
            </>
        );
    }

}
