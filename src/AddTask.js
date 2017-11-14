import React, { Component } from 'react';
import './AddTask.css';

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: 'New Task',
            button: 'Add',
            description: ''
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    handleUpdate(event) {
        this.setState({ description: event.target.value });
    }

    addTask() {
        this.props.addTask(this.state.description);
    }

    render() {
        return (
            <div className={"AddTask"}>
                <h3>{this.state.header}:</h3>
                <input
                    className={"task_text_input"}
                    type="text"
                    onChange={this.handleUpdate}
                    value={this.state.description}
                />
                <br/>
                <button className={"add_task_button"} onClick={this.addTask}>{this.state.button}</button>
            </div>
        );
    }
}

export default AddTask;