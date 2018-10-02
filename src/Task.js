import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const grid = 8;

/**
 * Renders the appropriate styling for the Task.

 * @param draggableStyle
 * @param isDragging
 * @param borderColor
 */
const getTaskStyle = (draggableStyle, isDragging, borderColor) => ({
  // Outline the form of the Task, using the grid constant.
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  border: '0.25em solid',
  borderRadius: '1em',
  textAlign: 'left',

  // Change the borderColor based upon the input parameter.
  borderColor,

  // Change background color and text color if dragging.
  background: isDragging ? borderColor : '#4b3832',
  color: isDragging ? '#4b3832' : borderColor,

  // Apply inherited style.
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
      borderColor: '#ffe7c8'
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
      this.setState({ borderColor: '#e8caff' });
    } else if (this.state.progress === 'In progress') {
      this.setState({ progress: 'Completed' });
      this.setState({ borderColor: '#d7fdec' });
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
              style={getTaskStyle(
                provided.draggableStyle,
                snapshot.isDragging,
                this.state.borderColor
              )}
              {...provided.dragHandleProps}
            >
              <div>
                {/* Render the current progress and description. */}
                <strong>{this.state.progress}:</strong> {this.props.description}
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
