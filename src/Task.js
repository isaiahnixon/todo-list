import React, { Component } from 'react';
import './Task.css';

class Task extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 'Not started',
            borderColor: 'darkred'
        };
        this.updateProgress = this.updateProgress.bind(this);
    }

    updateProgress() {
        if(this.state.progress === 'Not started'){
            this.setState({ progress: 'In progress'});
            this.setState({ borderColor: 'gold'});
        } else if (this.state.progress === 'In progress') {
            this.setState({ progress: 'Completed'});
            this.setState({ borderColor: 'darkgreen'});
        } else if (this.state.progress === 'Completed'){
            this.props.removeTask(this.props.description);
        }
    }

    render() {
        const borderColor = this.state.borderColor;
        return (
            <div style={{ borderColor: borderColor }} onClick={this.updateProgress} className="Task">
                <div className={"task_description"}>
                    <strong>{this.state.progress}:</strong> {this.props.description} {this.props.id}
                </div>
            </div>
        );
    }
}

export default Task;