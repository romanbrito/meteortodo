import { Meteor } from 'meteor/meteor';
import { Tasks } from '../imports/api/tasks';

Meteor.methods({

  insertTask(tasks) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert(tasks);

  },

  deleteTask(taskID) {
    Tasks.remove(taskID);
    console.log("delete task");
  },

  updateTask(data) {
    Tasks.update(data.id, {
      $set: { checked: data.checked},
    });
  }, // adding private after removing autopublish

  setPrivate(taskID, setToPrivate) {
    const task = Tasks.findOne(taskID);

    // Make sure only the task onwer can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskID, { $set: { private: setToPrivate} });
  },

});