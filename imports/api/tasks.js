import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Tasks = new Mongo.Collection('tasks');

Tasks.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Tasks.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});



// schema
const TaskSchema = new SimpleSchema({
  text: {type: String},
  createdAt: {type: Date},
  checked: {
    type: Boolean,
    autoValue() {
      if (this.isInsert) {
        return false
      }
    }
    // same as above
    // autoValue: function() {
    //   if (this.isInsert) {
    //     return false
    //   }
    // }
  },
  owner: {type: String},
  username: {type: String}
});

Tasks.attachSchema(TaskSchema);