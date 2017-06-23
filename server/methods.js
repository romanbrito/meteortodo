import { Meteor } from 'meteor/meteor';
import { Tasks } from '../imports/api/tasks';

Meteor.methods({
  insertTask(tasks) {
    Tasks.insert(tasks);
  }
});