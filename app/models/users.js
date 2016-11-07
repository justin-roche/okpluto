/*
  This file contains the Users schema! Pretty self-explanatory.
*/

"use strict";

const mongoose = require('mongoose');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

var UserSchema = mongoose.Schema({
  username: { type: String, index: { unique: true }},
  id: {type: String, required: true, index: { unique: true }},
  firstname: String,
  lastname: String,
  profilepic: String,
  loc: String,
  lat: Number,
  lng: Number,
  picLink: String,
  dogname: String,
  dogLikes: [ObjectId],
  dogBreed: String,
  dogAge: Number,
  events: [String],
  blackListBreeds: [String]
});

UserSchema.methods.addBlackListBreeds = breedsArray => {
  this.blackListBreeds = breedsArray;
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);