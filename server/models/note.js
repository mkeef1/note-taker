
'use strict';

var pg       = require('../postgres/manager');


function Note(o){
  this.title = o.title;
  this.body  = o.body;
  this.user_id = o.user_id;
 }

Note.getAll = function(){
  pg.query('select * from notes', [], function(err, results){
    //console.log('notes>>>>', results);
    var notes = results.rows;
    console.log('notes>>', notes);
    return notes;
  });
};

Note.addNote = function(obj, cb){
  var note = new Note(obj);
  pg.query('insert into notes (title, body) values ($1, $2) returning id', [note.title, note.body], function(err, note){
    pg.query('select u.id from users u inner join notes n on u.id = n.user_id' [note.user_id], function(err, userId){
      console.log('userid', note.user_id);
      cb(note);
    });
  });
};

module.exports = Note;