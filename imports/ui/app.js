import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Elements } from '../api/elements.js';

import './element.js';
import './app.html';

Template.app.onCreated(() => {
  Template.instance().subscribe('elements');
});

Template.app.helpers({
  elements() {
    const sort = { atNum: 1 };
    return Elements.find({}, { sort });
  },
});

Template.app.events({
  'submit form.addElement'(event) {
    event.preventDefault();

    const { atNum, elName } = event.target;

    Meteor.call('addElement', atNum.value, elName.value);

    atNum.value = '';
    elName.value = '';
  },
});
