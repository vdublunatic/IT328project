import { Meteor } from 'meteor/meteor';

import { wordsUsedCollection } from '../collections/collections.js';

Meteor.startup(() => {
  // code to run on server at startup
});


//publish data that a client may or may not want
Meteor.publish('userData', function(){
    //is the user logged in?
    if (this.userId) {
        return Meteor.users.find();
    } else {
        this.ready(); //done...
    }
});

//hook to respond to user account creation!
Accounts.onCreateUser(function(option, user) {
    //options are sent from your login provider...

    //assign your profile
    user.profile = option.profile;

    //we can add our own data here...
    user.profile.userType = 'basic_user'; //admin, guest, basic_user, ...
    user.profile.address = {
        'street': "",
        'city': "",
        'state': "",
        'zip': ""
    };

    user.profile.siteVisits = 1;

    return user;
});