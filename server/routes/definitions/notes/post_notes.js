'use strict';

var Note = require('../../../models/note');

module.exports = {
  description: 'post a new note',
  handler: function(req, rep){
    req.payload.userId = req.auth.credentials.id;
    Note.addNote(req.payload, function(err, note){
      rep();
    });
  }
};