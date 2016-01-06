Template.element.onCreated(() => {
  Template.instance().elUpdate = new ReactiveVar(false);
});

Template.element.helpers({
  editing() {
    return Template.instance().elUpdate.get();
  }
});

Template.element.events({
  'submit form.updateElement'(event, template) {
    event.preventDefault();

    let atNum = event.target.atNum.value;
    let elName = event.target.elName.value;

    Meteor.call('updateElement', this._id, atNum, elName);

    template.elUpdate.set(false);
  },
  'click .cancel'(event, template) {
    template.elUpdate.set(false);
  },
  'click .update'(event, template) {
    template.elUpdate.set(true);
  },
  'click .delete'() {
    if (confirm("Are you sure you want to delete this element?")) {
      Meteor.call('removeElement', this._id);
    }
  }
});
