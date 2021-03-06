import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {wordsUsedCollection} from '../collections/collections.js';
import { Cars } from '../collections/collections.js';
import { Food } from '../collections/collections.js';
import { Technology } from '../collections/collections.js';
import { Sports } from '../collections/collections.js';

import './main.html';

//pull down some published data from the server
Meteor.subscribe("userData");
Meteor.subscribe('wordsUsed');
Meteor.subscribe('userList');


Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

//fields
var listOfWords = [];
var centerWord = "";
var previousWord = "";
var currentCategory = "";
var countdown = new ReactiveCountdown(30);
var scoreCounter = 0;


var players = [
    {
        playerId: Meteor.userId(),
        winning: false,
        image: "/images/playerIcons/gurman.PNG"
    },

];

//Players
Template.gameBoard.onCreated(function () {
    Session.set('player', players);
    Session.set('scoreCounter', scoreCounter);
    console.log("onCreated() for players called");

});

Template.gameBoard.helpers({

    'playerList': function () {

        return Session.get('player');

    },
    'getPlayer': function (index) {
        var players = Session.get('player');

        return players[index];
    },
    'getPlayerScore': function () {
        return Session.get('scoreCounter');
    }

});


Template.player.events({

    'click button': function (event) {

        //console.log(this);

        //prevent form from refreshing page
        event.preventDefault();

        //get our players current word
        var wordBeingGuessed = $('#wordSubmit').val().toLowerCase();

        console.log("What is this?" + wordBeingGuessed);

        //remove the current word from the submit form
        $('#wordSubmit').val('');


        //add the word to the players list of chosen words if its
        //not contained in the collection

        //is this word blank? or null?
        if (wordBeingGuessed == null || wordBeingGuessed == "") {
            alert("Please enter a valid word");
            $('#wordSubmit').val('');
        }

        //does this word match the last letter of the previous word
        else if (wordBeingGuessed != null && !wordBeingGuessed.startsWith(previousWord.slice(-1))) {
            alert("Please enter a valid word that starts with " + previousWord.slice(-1).toUpperCase());
            $('#wordSubmit').val('');
        }

        //make sure the database does not contain the words
        else if (wordsUsedCollection.findOne( {"word": wordBeingGuessed } ) != undefined)
        {
            alert("Please enter a word that hasn't been used");
            $('#wordSubmit').val('');
        }

        //insert the word into the database
        else
        {
            Meteor.call('wordInsert', wordBeingGuessed);

            //create the center word and save the session
            centerWord = wordBeingGuessed; // set the word to the center word
            previousWord = wordBeingGuessed; // set the previous word
            Session.set('currentWord', centerWord);
            scoreCounter++; //increment the players score each time a word is played
            Session.set('scoreCounter', scoreCounter);
            players.score = scoreCounter; //assign the counter to the score
            Session.set('player', players); // reset the player session

            countdown.stop(); //restart the counter
            countdown.start(function() {

                countdown.stop();
                if(scoreCounter > Meteor.user().highScore) {
                    Meteor.call('updateHighScore', scoreCounter, Meteor.userId());
                }
                Router.go('/highscore');
                Session.set('0', scoreCounter);

            });
        }
    }

});

/*
 * The heading for the list of words that were used
 */

Template.wordListHeading.events({
    'click button': function (event) {
        event.preventDefault();
        if (confirm("Really delete all words use?")) {
            //bookmarksCollection.remove({});
            wordsUsedCollection.find().forEach(function (word) {
                Meteor.call('wordDelete');
            });
        }
    }
})

/*
 This event changes the currently selected category and plays the game
 */
Template.category.events({
    'change #category': function (event) {
        event.preventDefault();
        currentCategory = $('#category').val();

        console.log(currentCategory);
    },

    'click #playButton' : function (event) {
        event.preventDefault();
        Session.set('currentCategory', currentCategory);
        Router.go('/game');
    }
})


/*
 * The list of words being used by all of the players combined
 */

Template.wordList.onCreated(function () {


    Session.set('word', listOfWords);
    console.log("onCreated() for words called");

});

Template.wordList.helpers({
    'allWords': function () {
        return wordsUsedCollection.find();
    }

});


/*
 * The center word
 */
Template.word.events({
    'click #rejectButton' : function (event) {

        event.preventDefault();

        Meteor.call('deleteOne', centerWord);

        centerWord = previousWord; // set the previous word
        Session.set('currentWord', centerWord);
    }
});

Template.word.onCreated(function () {
    Session.set('currentWord', centerWord);
});

Template.word.helpers({
    'mainWord': function () {
        return Session.get('currentWord');
    },
    'currentCategory': function (){
        return Session.get('currentCategory');
    }
});
Template.content.helpers({
    "isLoggedIn": function () {
        return Meteor.user() != null;
    }
});


/*
 * This is a counter
 */
Template.countDown.helpers({
    'getCountdown' : function() {
        return countdown.get();
    }

});

Template.highScore.helpers({
    getAllHighScore: function() {
        return Meteor.users.find({}, {"sort": {"highScore": -1}});
    },
})

Template.highScore.events({
    'click #playAgain' : function (event) {
        Router.go('/');
    }
})

Template.rules.helpers({
    'currentCategory': function (){
        return Session.get('currentCategory');
    }
})