/**
 * This class renders the AddTask block that handles user input to render more Tasks.
 */

import React, { Component } from 'react';
import './AddTask.css';

class AddTask extends Component {
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
      header: 'New Task',
      button: 'Add',
      description: ''
    };
    // Bind "this" calls in handleUpdate() and addTask() to this instantiation of the class.
    this.handleUpdate = this.handleUpdate.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  /**
   * Updates the description based upon the user input.
   *
   * @param event
   * The automatically inherited event attributes.
   */
  handleUpdate(event) {
    // Set the description to the value of the target of the event.
    this.setState({ description: event.target.value });
  }

  /**
   * Passes the current description to the addTask() function defined as a
   * property when the class is instantiated.
   */
  addTask() {
    this.props.addTask(this.state.description);
  }
  /**
   * @returns {JSX}
   * The markup for React to process into the front-end display.
   */
  render() {
    return (
      <div className={'AddTask'}>
        {/* Render the header. */}
        <h3>{this.state.header}:</h3>
        {/* Render a text input for the user to manipulate the description. */}
        <input
          className={'task_text_input'}
          type="text"
          onChange={this.handleUpdate}
          value={this.state.description}
        />
        <br />
        {/* Render a button that calls addTask(). */}
        <button className={'add_task_button'} onClick={this.addTask}>
          {this.state.button}
        </button>
      </div>
    );
  }
}

export default AddTask;
