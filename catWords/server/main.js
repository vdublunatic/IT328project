import { Meteor } from 'meteor/meteor';

import { wordsUsedCollection } from '../collections/collections.js';
import { Cars } from '../collections/collections.js';
import { Food } from '../collections/collections.js';
import { Technology } from '../collections/collections.js';
import { Sports } from '../collections/collections.js';


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
    },
    deleteOne: function(word) {
        wordsUsedCollection.remove({"word": word});
    },
    copyToNewCollection: function(collection2){
        wordsUsedCollection.find().forEach(function(doc){
            if (collection2.findOne(doc.word) != undefined) {
                db.collection2.insert(doc); // start to replace
            }
        });
    },
    updateHighScore: function (highScore, userId) {
        Meteor.users.update({"_id": userId}, {"$set": {
            "profile.highScore": highScore
        }})
    }

});

//publish the words used collection so that it is available to the client
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
