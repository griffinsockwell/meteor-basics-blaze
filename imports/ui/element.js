import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './element.html';

Template.element.onCreated(() => {
  Template.instance().isEditing = new ReactiveVar(false);
});

Template.element.helpers({
  editing() {
    return Template.instance().isEditing.get();
  },
});

Template.element.events({
  'submit form.updateElement'(event, template) {
    event.preventDefault();

    const { atNum, elName } = event.target;

    Meteor.call('updateElement', this._id, atNum.value, elName.value);

    template.isEditing.set(false);
  },
  'click .cancel'(event, template) {
    template.isEditing.set(false);
  },
  'click .update'(event, template) {
    template.isEditing.set(true);
  },
  'click .delete'() {
    Meteor.call('removeElement', this._id);
  },
});
