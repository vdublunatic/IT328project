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
var wordBeingGuessed;

var players = [
    {
        playerId: 0,
        playerName: "Gurman",
        chosenWords: ["test"],
        score: 0,
        highScore: 0,
        winning: false
    },

    {
        playerId: 1,
        playerName: "Josh",
        chosenWords: ["test"],
        score: 0,
        highScore: 0,
        winning: false
    },

    {
        playerId: 2,
        playerName: "Yegor",
        chosenWords: ["test"],
        score: 0,
        highScore: 0,
        winning: false
    },

    {
        playerId: 3,
        playerName: "SuperAwesome",
        chosenWords: ["test"],
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
        var currentWord = $('#wordSubmit').val();

        //remove the current word from the submit form
        $('#wordSubmit').val("");

        //add the word to the players list of chosen words

        players[this.playerId].chosenWords.push(currentWord);

        //
        wordBeingGuessed = currentWord;


        Session.set('word', words);
        Session.set('player', players);

        console.log(players[this.playerId].chosenWords);


        //console.log(this);
    }

});


//Word in the middle
Template.word.onCreated(function () {

    Session.set('word', words);
    console.log("onCreated() for words called");

});

Template.word.helpers({

    'currentWord' : function() {

        console.log(wordBeingGuessed);
        return wordBeingGuessed;

    }



});

Template.word.events({

});
