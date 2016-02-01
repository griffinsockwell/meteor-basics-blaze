const CONNECTION_ISSUE = 'ConnectionIssue';

Session.setDefault(CONNECTION_ISSUE, true);

Meteor.startup(function() {
  setTimeout(function() {
    Session.set(CONNECTION_ISSUE, false);
  }, 5000);
});

Template.app.onCreated(() => {
  Template.instance().subscribe('elements');
});

Template.app.helpers({
  elements() {
    let sort = { atNum: 1 };
    return Elements.find({}, { sort });
  },
  connected() {
    return Session.get(CONNECTION_ISSUE) || Meteor.status().connected;
  }
});

Template.app.events({
  'submit form.addElement'(event) {
    event.preventDefault();

    let atNum = event.target.atNum.value;
    let elName = event.target.elName.value;

    Meteor.call('addElement', atNum, elName);

    event.target.atNum.value = "";
    event.target.elName.value = "";
  }
});
