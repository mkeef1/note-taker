'use strict';

var Note = require('../../../models/note');

module.exports = {
  description: 'post a new note',
  handler: function(req, rep){
    Note.addNote(req.payload, req.auth.credentials.id, function(err, note){
      rep();
    });
  }
};