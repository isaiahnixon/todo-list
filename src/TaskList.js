/**
 * This class pieces together the application and stores the array of the tasks.
 */

import React, { Component } from 'react';
import './TaskList.css';
import AddTask from './AddTask';
import Task from './Task';

class TaskList extends Component {

    /**
     * This function is called upon instantiation of the class.
     *
     * @param props
     */
    constructor(props) {
        // Call the parent constructor.
        super(props);
        // Define the default state.
        this.state = {
            header: 'Todo List',
            tasks: ['Write the tests for this application'],
            message: 'Click on a task to progress it through the workflow:\n' +
            'Not started -> In progress -> Completed\n' +
            'Click again to delete the task\n'
        };
        // Bind "this" calls in addTask() and removeTask() to this instantiation of the class.
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }

    /**
     * Adds a new Task instantiation to the TaskList.
     *
     * @param newDescription
     * (string) The description of the Task to be added.
     */
    addTask(newDescription) {
        // Test if the description is empty.
        if(newDescription !== ''){
            // Test if the task does not already exist.
            if(!this.state.tasks.includes(newDescription)){
                // Add the task and clear the message.
                this.setState({ tasks: [...this.state.tasks, newDescription] });
                this.setState({ message: ''});
            } else {
                // Inform the user the task is a duplicate.
                this.setState({ message: 'You already have a task for that'})
            }
        } else {
            // Inform the user that input is required.
            this.setState({ message: 'Input field cannot be empty'});
        }
    }

    /**
     * Removes a Task from the TaskList.
     *
     * @param removeDescription
     * (string) The description of the Task to be removed.
     */
    removeTask(removeDescription) {
        // An array of all Tasks where their description is not removeDescription.
        const filteredTasks =
            this.state.tasks.filter(description => {
                return description !== removeDescription;
            });

        // Reset the TaskList with the filteredTasks.
        this.setState({ tasks: filteredTasks});
    }

    /**
     * @returns {Array}
     * The raw JSX of the Tasks to be rendered.
     */
    renderTasks() {
        return this.state.tasks.map(description => (
            <Task key={description} description={description} removeTask={this.removeTask}/>
        ));
    }

    /**
     * @returns {JSX}
     * The markup for React to process into the front-end display.
     */
    render() {
        return (
            <div className="TaskList">
                {/* Render the current header. */}
                <div className={'task_list_header'}><h1>{this.state.header}</h1></div>
                {/* Instantiate an AddTask, passing it the addTask function from this class. */}
                <AddTask addTask={this.addTask}/>
                {/* Render the current user message. */}
                <div className={'task_list_message'}><h3>{this.state.message}</h3></div>
                {/* Call the renderTasks() function. */}
                {this.renderTasks()}
            </div>
        );
    }
}

export default TaskList;
