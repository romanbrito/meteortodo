import { Meteor } from 'meteor/meteor';
import { Tasks } from '../imports/api/tasks';

Meteor.methods({

  'tasks.insert'(tasks) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert(tasks);

  },

  'tasks.remove'(taskID) {

    const task = Tasks.findOne(taskID);
    if (task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }


    Tasks.remove(taskID);
    console.log("delete task");
  },

  'tasks.setChecked'(data) {

    const task = Tasks.findOne(data.id);
    if (task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }


    Tasks.update(data.id, {
      $set: { checked: data.checked},
    });
  }, // adding private after removing autopublish

  'tasks.setPrivate'(taskID, setToPrivate) {
    const task = Tasks.findOne(taskID);

    // Make sure only the task onwer can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskID, { $set: { private: setToPrivate} });
  },

});