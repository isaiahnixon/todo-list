import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './Task.css';

const grid = 8;

/**
 * Renders the appropriate styling for the Task.
 * @param draggableStyle
 * @param isDragging
 * @param borderColor
 */
const getItemStyle = (draggableStyle, isDragging, borderColor) => ({
  // Outline the basic form, using the grid constant.
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  border: '0.5em solid',
  borderRadius: '4em',

  // Change the borderColor based upon the input parameter.
  borderColor,

  // change background colour if dragging
  background: isDragging ? 'lightblue' : 'grey',
  color: isDragging ? 'black' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle
});

/**
 * This class renders a task and stores its local state variables.
 */
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
    return (
      <Draggable
        key={this.props.description}
        draggableId={this.props.description}
      >
        {(provided, snapshot) => (
          // Call updateProgress() when the Task is clicked.
          <div onClick={this.updateProgress}>
            <div
              ref={provided.innerRef}
              style={getItemStyle(
                provided.draggableStyle,
                snapshot.isDragging,
                this.state.borderColor
              )}
              {...provided.dragHandleProps}
            >
              <div>
                {/* Render the current progress and description. */}
                <div className="task_description">
                  <strong>{this.state.progress}:</strong>{' '}
                  {this.props.description}
                </div>
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}

export default Task;
