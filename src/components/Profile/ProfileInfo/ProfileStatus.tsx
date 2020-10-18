import React from "react";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
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
        } );
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e: any) => {
        this.setState({
            status: e.currentTarget.value
        });
}


    render() {
        return (
            <>
                {
                    !this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "---"}</span>
                    </div>
                }
                {
                    this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} onBlur={this.deactivateEditMode} autoFocus={true} value={this.state.status}/>
                    </div>
                }
            </>
        );
    }

}
