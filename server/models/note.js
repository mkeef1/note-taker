
'use strict';

var pg       = require('../postgres/manager');


function Note(o){
  this.title = o.title;
  this.body = o.body;

}

Note.getAll = function(){
  pg.query('select * from notes', [], function(err, results){
    //console.log('notes>>>>', results);
    var notes = results.rows;
    console.log('notes>>', notes);
    //return notes;
  });
};

module.exports = Note;