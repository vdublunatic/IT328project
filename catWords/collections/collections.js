
//import the mongo object
import { Mongo } from "meteor/mongo";

//words used object
export const wordsUsedCollection = new Mongo.Collection("wordsUsedCollection");

//database categories

//cars
export const Cars = new Mongo.Collection("carWordsCollection");
//food
export const Food = new Mongo.Collection("foodWordsCollection");
//technology
export const Technology = new Mongo.Collection("technologyWordsCollection");
//sports
export const Sports = new Mongo.Collection("sportsWordsCollection");

