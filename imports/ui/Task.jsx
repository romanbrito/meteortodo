import React, {Component, PropTypes } from 'react';
// to create methods for secure
import {Meteor} from 'meteor/meteor';

// mongodb
import { Tasks} from '../api/tasks';


// task component - represents a single todo item
export default class Task extends Component {

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    let data = {
      id: this.props.task._id,
      checked: !this.props.task.checked
    };

    // for secure
    Meteor.call('updateTask', data, (error) => {
      if (error) {
        console.log("error " + error.reason);
      } else {
        console.log("Task updated");
      }
    });


  }

  deleteThisTask() {

    let taskID = this.props.task._id;

    // for secure
    Meteor.call('deleteTask', taskID, (error) => {
      if (error) {
        console.log("error " + error.reason);
      } else {
        console.log("Task deleted");
      }
    });

  }

  render() {
    // Give tasks a different className when they are chcked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />
        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
          </span>
        </li>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a react prop.
  // We can use porpTypes to indicate it is required
  task: PropTypes.object.isRequired,
};