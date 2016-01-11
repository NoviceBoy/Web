if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('date', new Date());

  Template.hello.helpers({
    date: function () {
      return Session.get('date');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
