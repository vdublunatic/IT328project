import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//fields
var words = [];
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
        playerId: 1,
        playerName: "Player1",
        chosenWords: [],
        score: 0,
        highScore: 0,
        winning: false
    },

    {
        playerId: 2,
        playerName: "Player2",
        chosenWords: [],
        score: 0,
        highScore: 0,
        winning: false
    },

    {
        playerId: 3,
        playerName: "Player3",
        chosenWords: [],
        score: 0,
        highScore: 0,
        winning: false
    },

    {
        playerId: 4,
        playerName: "Player4",
        chosenWords: [],
        score: 0,
        highScore: 0,
        winning: false
    },
];

//Players
Template.player.onCreated(function () {

    Session.set('players', players);
    console.log("onCreated() for players called");

});

Template.player.helpers({

});

Template.player.events({

    'click button' : function () {

        //prevent form from refreshing page
        event.preventDefault();

        //get our players current word
        var currentWord = $('#wordSubmit').val();

        //remove the current word from the submit form
        $('#wordSubmit').val("");

        //add the word to the players list of chosen words
        players[this.playerId].chosenWords.push(currentWord);

        Set.session('word', words);
        
    }

});


//Word in the middle
Template.word.onCreated(function () {

    Session.set('word', words);
    console.log("onCreated() for words called");

});

Template.word.helpers({

});

Template.word.events({

});
