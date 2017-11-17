/**
 * This class renders a task and stores its local state variables.
 */

import React, { Component } from 'react';
import './Task.css';

class Task extends Component {
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
      progress: 'Not started',
      borderColor: 'darkred'
    };
    // Bind "this" calls in updateProgress() to this instantiation of the class.
    this.updateProgress = this.updateProgress.bind(this);
  }

  /**
   * This function tests the current progress and then moves it one step forward along the workflow.
   */
  updateProgress() {
    if (this.state.progress === 'Not started') {
      this.setState({ progress: 'In progress' });
      this.setState({ borderColor: 'gold' });
    } else if (this.state.progress === 'In progress') {
      this.setState({ progress: 'Completed' });
      this.setState({ borderColor: 'darkgreen' });
    } else if (this.state.progress === 'Completed') {
      // This is a call to removeTask(), which is a property defined when the class is instantiated.
      this.props.removeTask(this.props.description);
    }
  }

  /**
   * @returns {JSX}
   * The markup for React to process into the front-end display.
   */
  render() {
    // Gather the current borderColor.
    const borderColor = this.state.borderColor;
    return (
      <div>
        {/* Call updateProgress() when the Task is clicked. */}
        <div
          onClick={this.updateProgress}
          style={{ borderColor: borderColor }}
          className="Task"
        >
          {/* Render the current progress and description. */}
          <div className={'task_description'}>
            <strong>{this.state.progress}:</strong> {this.props.description}
          </div>
        </div>
      </div>
    );
  }
}

export default Task;
