import React from "react";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

type ProfileStateType = {
    editMode: boolean,
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusType, ProfileStateType> {

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

    componentDidUpdate(prevProps: ProfileStatusType, prevState: ProfileStateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status,
            });
        }
        console.log('componentDidUpdate')
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
