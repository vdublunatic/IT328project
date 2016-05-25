/*
 This is the collections java script file

 By Joshua Clark
 */

//import the mongo object
import { Mongo } from "meteor/mongo";

//words used object
export const wordsUsedCollection = new Mongo.Collection("wordsUsedCollection");

//database categories

//cars
export const carWordsCollection = new Mongo.Collection("carWordsCollection");
//food
export const foodWordsCollection = new Mongo.Collection("foodWordsCollection");
//technology
export const technologyWordsCollection = new Mongo.Collection("technologyWordsCollection");
//sports
export const sportsWordsCollection = new Mongo.Collection("sportsWordsCollection");

