import React, { Component } from 'react';
import './TaskList.css';
import AddTask from './AddTask';
import Task from './Task';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: 'Todo List',
            tasks: ['Write the tests for this application'],
            message: 'Click on a task to progress it through the workflow:\n' +
            'Not started -> In progress -> Completed\n' +
            'Click again to delete the task\n'
        };
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }

    addTask(newDescription) {
        if(newDescription !== ''){
            if(!this.state.tasks.includes(newDescription)){
                this.setState({ tasks: [...this.state.tasks, newDescription] });
                this.setState({ message: ''});
            } else {
                this.setState({ message: 'You already have a task for that'})
            }
        } else {
            this.setState({ message: 'Input field cannot be empty'});
        }
    }

    removeTask(removeDescription) {
        const filteredTasks =
            this.state.tasks.filter(description => {
                return description !== removeDescription;
            });
        this.setState({ tasks: filteredTasks});
    }

    renderTasks() {
        return this.state.tasks.map(description => (
            <Task key={description} description={description} removeTask={this.removeTask}/>
        ));
    }



    render() {
        return (
            <div className="TaskList">
                <div className={'task_list_header'}><h1>{this.state.header}</h1></div>
                <AddTask addTask={this.addTask}/>
                <div className={'task_list_message'}><h3>{this.state.message}</h3></div>
                {this.renderTasks()}
            </div>
        );
    }
}
export default TaskList;