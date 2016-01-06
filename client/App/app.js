Template.app.onCreated(() => {
  Template.instance().subscribe('elements');
});

Template.app.helpers({
  elements() {
    let sort = { atNum: 1 };
    return Elements.find({}, { sort });
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
