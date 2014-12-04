'use strict';

var pg = require('../postgres/manager');

function Tag(o){
  this.name = o.name;
}

Tag.addTag = function(obj, cb){
  pg.query('insert into tags (name) values ($1) returning id', [obj.name], function(err, tag){
    cb(tag);
  });
};

module.exports = Tag;