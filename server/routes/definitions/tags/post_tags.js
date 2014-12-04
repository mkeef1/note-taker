'use strict';

var Tag = require('../../../models/tag');

module.exports = {
  description: 'post to tags',
  handler: function(req, rep){
    Tag.addTag(req.payload, function(err, tag){
      rep();
    });
  }
};