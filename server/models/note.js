
'use strict';

var pg       = require('../postgres/manager');


function Note(o){
  this.title = o.title;
  this.body  = o.body;
  this.userId = o.userId;
 }

Note.getAll = function(){
  pg.query('select * from notes', [], function(err, results){
    //console.log('notes>>>>', results);
    var notes = results.rows;
    console.log('notes>>', notes);
    return notes;
  });
};

Note.addNote = function(obj, id, cb){
  var note = new Note(obj);
  pg.query('insert into notes (title, body, user_id) values ($1, $2, $3) returning id', [note.title, note.body, note.userId], function(err, note){
    //pg.query('select u.id from users u inner join notes n on u.id = n.userId' [note.userId], function(err, userId){
      console.log('userid', note.userId);
      cb(note);
    //});
  });
};

module.exports = Note;