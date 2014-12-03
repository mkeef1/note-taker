'use strict';

var request  = require('request'),
    bcrypt   = require('bcrypt'),
    path     = require('path'),
    AWS      = require('aws-sdk'),
    pg       = require('../postgres/manager'),
    crypto   = require('crypto');


function User(o){
  this.username = o.username;

}

User.login = function(obj, cb){
  pg.query('select * from users where username = $1 limit 1', [obj.username], function(err, results){
    if(err){
     return cb();
    }


    var user = results.rows[0];
    console.log('results', results);
    var isGood = bcrypt.compareSync(obj.password, user.password);
    console.log('isGood', isGood);

    if(!isGood){
      return cb();
    }

    cb(user);
  });
};


User.register = function(obj, cb){
  var user = new User(obj);
  user.password = bcrypt.hashSync(obj.password, 8);

  randomUrl(obj.avatar, function(file, avatar){
    user.avatar = avatar;
    pg.query('insert into users (username, password, avatar) values ($1, $2, $3) returning id', [user.username, user.password, user.avatar], function(err, results){
      if(err){return cb(true);}
      download(obj.avatar, file, cb);
    });
  });
};

function randomUrl(url, cb){
  var ext  = path.extname(url);

  crypto.randomBytes(48, function(ex, buf){
    var token  = buf.toString('hex'),
        file   = token + '.avatar' + ext,
        avatar = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + file;
    cb(file, avatar);
  });
}

function download(url, file, cb){
  var s3 = new AWS.S3();

  request({url: url, encoding: null}, function(err, response, body){
    var params = {Bucket: process.env.AWS_BUCKET, Key: file, Body: body, ACL: 'public-read'};
    s3.putObject(params, cb);
  });
}      







module.exports = User;

/*
var mongoose   = require('mongoose'),
    bcrypt     = require('bcrypt'),
    request    = require('request'),
    path       = require('path'),
    AWS        = require('aws-sdk'),
    UserSchema = null,
    User       = null;

UserSchema = new mongoose.Schema({
  username:  {type: String, required: true,  validate: [usernameV, 'username length'], unique: true},
  password:  {type: String, required: true,  validate: [passwordV, 'password length']},
  avatar:    {type: String, required: true},
  socketId:  {type: String, required: false, validate: [socketV, 'socket length']},
  createdAt: {type: Date,  required: true, default: Date.now}
});

UserSchema.methods.encrypt = function(){
  this.password = bcrypt.hashSync(this.password, 10);
};

UserSchema.methods.download = function(cb){
  var s3   = new AWS.S3(),
      url  = this.avatar,
      ext  = path.extname(this.avatar),
      file = this._id + '.avatar' + ext;

  this.avatar = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + file;

  request({url: url, encoding: null}, function(err, response, body){
    var params = {Bucket: process.env.AWS_BUCKET, Key: file, Body: body, ACL: 'public-read'};
    s3.putObject(params, cb);
  });
};

UserSchema.statics.login = function(obj, cb){
  User.findOne({username: obj.username}, function(err, user){
    if(!user){
     return cb();
    }

    var isGood = bcrypt.compareSync(obj.password, user.password);

    if(!isGood){
      return cb();
    }

    cb(user);
  });
};

function usernameV(v){
  return v.length >= 3 && v.length <= 12;
}

function passwordV(v){
  return v.length === 60;
}

function socketV(v){
  return v.length === 20;
}

User = mongoose.model('User', UserSchema);
module.exports = User;
*/