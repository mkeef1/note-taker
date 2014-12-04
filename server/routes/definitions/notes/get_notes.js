'use strict';

var Note = require('../../../models/note');

module.exports = {
  description: 'Get to Notes Page',
  handler: function(req, rep){

    console.log('creds', req.auth.credentials.id);
    Note.getAll(req.auth.credentials, function(err, notes){
      rep(notes);
    });
  }
};