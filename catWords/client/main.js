import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//fields
var wordHistory = [];
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
        chosenWords: [],
        score: 0,
        highScore: 0,
        winning: false,
        image: "/images/playerIcons/gurman.PNG"
    },

    {
        playerId: 1,
        playerName: "Josh",
        chosenWords: [],
        score: 0,
        highScore: 0,
        winning: false,
        image: "/images/playerIcons/joshua.JPG"
    },

    {
        playerId: 2,
        playerName: "Yegor",
        chosenWords: [],
        score: 0,
        highScore: 0,
        winning: false,
        image: "/images/playerIcons/yegor.PNG"
    },

    {
        playerId: 3,
        playerName: "Yolanda",
        chosenWords: [],
        score: 0,
        highScore: 0,
        winning: false,
        image: "/images/playerIcons/yolanda.png"
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

    'click button' : function (event) {

        //console.log(this);

        //prevent form from refreshing page
        event.preventDefault();

        //get our players current word
        var textbox = '#wordSubmit ' + this.playerId;
        console.log(typeof textbox);
        var currentWord = $(textbox);

        //remove the current word from the submit form
        $('#wordSubmit '  + this.playerId).val("");

        //add the word to the player's list of chosen words
        players[this.playerId].chosenWords.push(currentWord);

        //saves the current word
        wordBeingGuessed = currentWord;

        //adds the current word to wordHistory array
        wordHistory.push(currentWord);

        //sets the word history and player objects
        Session.set('word', wordHistory);
        Session.set('player', players);
        Session.set('wordBeingGuessed', wordBeingGuessed);

        //logging
        //console.log(players[this.playerId].chosenWords);
        //console.log("history" + wordHistory);
        //console.log(this);
    }

});


//Word in the middle
Template.word.onCreated(function () {

    Session.set('word', wordHistory);
    console.log("onCreated() for words called");

});

Template.word.helpers({

    'currentWord' : function() {

        console.log(";alksdfjl;asdk" + wordBeingGuessed);
        return wordBeingGuessed;

    }



});

Template.word.events({

});
