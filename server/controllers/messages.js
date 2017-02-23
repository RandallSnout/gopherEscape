console.log("messages Controller");

var mongoose = require('mongoose');
var Message = mongoose.model('Message');

function messagesController(){
  this.home = function(req,res){
    Message.find({forUser: req.session.userId}, false, true).exec(function(err, messages) {
    res.json(messages);
  })
  };
  this.addmessage = function(req,res){
    var newMessage = new Message(req.body)
    newMessage._user = req.session.userId;
    newMessage.forUser = req.params.id;
    newMessage.save( function(err, result) {
      if(err) {
        console.log('unable to add message');
      } else {
        console.log('successfully added a message!');
         res.json(result);
      }
    })
  };
  this.index = function(req,res){
    Message.find({forUser: req.session.userId}).populate('_user').exec(function(err,messages){
      if(err){
        console.log('unable to grab messages');
        res.sendStatus(404);
      }else{
        console.log('foundem')
        res.json(messages);
      }
    })
  };
  this.friendMess = function(req,res){
    Message.find({forUser: req.params.id}).populate('_user').exec(function(err,messages){
      if(err){
        console.log('unable to grab messages');
        res.sendStatus(404);
      }else{
        console.log('foundem')
        res.json(messages);
      }
    })
  }
};

module.exports = new messagesController();