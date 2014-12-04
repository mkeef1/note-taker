'use strict';

var Note = require('../../../models/note');

module.exports = {
  description: 'Get to Notes Page',
  handler: function(req, rep){
    Note.getAll(function(err, notes){
      rep('this is the notes rep');
    });
  }
};