import { Meteor } from 'meteor/meteor';
import { Tasks } from '../imports/api/tasks';

Meteor.methods({

  insertTask(tasks) {
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
  }
});