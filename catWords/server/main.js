import { Meteor } from 'meteor/meteor';

import { wordsUsedCollection } from '../collections/collections.js';

Meteor.startup(() => {
  // code to run on server at startup
});
Meteor.methods({
    wordInsert: function(word) {
        wordsUsedCollection.insert({
                "word": word
        })},
    getSingleWord: function(_id) {
        return wordsUsedCollection.findOne();
    },
    wordDelete: function() {
        wordsUsedCollection.remove({});
    }
});

Meteor.publish('wordsUsed', function() {
    //sort by most recent changes
    return wordsUsedCollection.find();
});

//publish data that a client may or may not want
Meteor.publish('userData', function(){
    //is the user logged in?
    if (this.userId) {
        return Meteor.users.find({});
    } else {
        this.ready(); //done...
    }
});



//hook to respond to user account creation!
Accounts.onCreateUser(function(option, user) {
    //options are sent from your login provider...

    //assign your profile
    user.profile = option.profile;

    return user;
});
