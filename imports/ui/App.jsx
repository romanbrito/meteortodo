// create a container component which provides data to your presentational components.
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Tasks} from '../api/tasks.js';

import Task from './Task.jsx';
// blaze user template wrapped in react component
import AccountsUIWrapper from './AccountsUIWrapper';

// App component - represents the whole app
class App extends Component {
  // state added to hide completed
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    let tasks = {
      text,
      createdAt: new Date(), // current time
      owner: Meteor.userId(), // _id of logged in user
      username: Meteor.user().username, // username of logged in user
    };

    Meteor.call('insertTask', tasks, (error) => {
      if (error) {
        console.log("error " + error.reason);
      } else {
        console.log("Task added");
      }
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    })
  }


  // renderTasks() {
  //   return this.props.tasks.map((task) => (
  //     <Task key={task._id} task={task} />
  //   ));
  // }
  // render tasks with hide completed
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }

    // private button
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });


  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper/>

          {/*Conditional to show form only when logged in user*/}
          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
            </form> : ''
          }


        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }

}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

// create Container to feed Meteor's reactive data into React's component hierarchy
export default createContainer(() => {
  // after removing autopublish when app component is created
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
    // since we already have the data in the client-side, adding count
    // doesn't involve asking the server for anything
    incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
    // info about the currently logged user
    currentUser: Meteor.user(),
  };
}, App);

// import React, { Component } from 'react';
//
// import Task from './Task.jsx';
//
//
// // App component - represents the whole app
// export default class App extends Component {
//   getTasks() {
//     return [
//       {_id: 1,text: 'this is task 1'},
//       {_id: 2,text: 'this is task 2'},
//       {_id: 3,text: 'this is task 3'},
//       {_id: 4,text: 'this is task 4'}
//     ];
//   }
//
//   renderTasks() {
//     return this.getTasks().map((task) => (
//       <Task key={task._id} task={task} />
//     ))
//   }
//
//   render() {
//     return (
//       <div className="container">
//         <header>
//           <h1>Todo List</h1>
//         </header>
//
//         <ul>
//           {this.renderTasks()}
//         </ul>
//       </div>
//     );
//   }
// }