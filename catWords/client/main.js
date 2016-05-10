import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//fields
var listOfWords = [];
var wordBeingGuessed;
var dictionary = [

    //categories of words

    {
        category: "cars",
        carWords: ["engine", "tire", "starter", "alternator", "radiator", "transmission", "reverse", "drive", "golf",
        "camaro", "prelude"]

    }
];

var players = [
    {
        playerId: 0,
        playerName: "Gurman",
        score: 0,
        highScore: 0,
        winning: false
    },

    {
        playerId: 1,
        playerName: "Josh",
        score: 0,
        highScore: 0,
        winning: false
    },

    {
        playerId: 2,
        playerName: "Yegor",
        score: 0,
        highScore: 0,
        winning: false
    },

    {
        playerId: 3,
        playerName: "SuperAwesome",
        score: 0,
        highScore: 0,
        winning: false
    },
];

//Players
Template.gameBoard.onCreated(function () {

    Session.set('player', players);
    console.log("onCreated() for players called");

});

Template.gameBoard.helpers({

    'playerList': function () {

        return Session.get('player');
       console.log(players);

    },
    'getPlayer': function(index) {
        var players = Session.get('player');

        return players[index];
    }

});

Template.player.events({

    'click button' : function () {

        //prevent form from refreshing page
        event.preventDefault();

        //get our players current word
        var wordBeingGuessed = $('#wordSubmit').val();

        //remove the current word from the submit form
        $('#wordSubmit').val("");

        //add the word to the players list of chosen words

        listOfWords.push(wordBeingGuessed);

        //

        Session.set('player', players);
        Session.set('word', listOfWords);
        console.log(listOfWords);


        console.log(this);
    }

});

Template.wordList.onCreated(function () {

    Session.set('word', listOfWords);
    console.log("onCreated() for words called");

});

Template.wordList.helpers({
    allWords: function(){
        return Session.get('word');
    }

});

Template.word.events({

});
