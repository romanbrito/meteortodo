import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

// accounts configuration
import '../imports/startup/accounts-config';

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});