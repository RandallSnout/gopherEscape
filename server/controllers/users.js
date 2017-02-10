console.log('users controller');
// WE NEED TO ADD A FEW lines of code here!
// How does a controller talk to mongoose and get a model?
// Build out the methods in the friendsControllers below
var mongoose = require('mongoose')
var User = mongoose.model('User');
module.exports = {

    show: function(req,res){
        //your code here
        User.findOne({_id: req.session.userId}, function(err, result){
            console.log(result);
            res.json(result);
        })
    },

    showAll: function(req,res){
        //your code here
        User.find({_id: {'$ne':req.session.userId }}, {name:1, gamer_name:1}).exec(function(err, result){
            res.json(result);
        })
    },

    showFriends: function(req,res){
        //your code here
        User.find({_id: req.session.userId }).populate('friends').exec(function(err, result){
            res.json(result);
        })
    },

    showRequests: function(req,res){
        //your code here
        User.find({_id: req.session.userId }).populate('requests').exec(function(err, result){
            res.json(result);
        })
    },

    update: function(req, res){
    	User.findOne({_id: req.session.userId}, function(err, user){
            console.log('pizza party');
            if(err){
                console.log(err);
            }else{
            	var user;
            	if (req.body.name){
                	user.name = req.body.name;
            	};
            	if(req.body.email){
                	user.email = req.body.email;
            	};
            	if(req.body.gamer_name){
	                user.gamer_name = req.body.gamer_name;
	            };
	            if(req.body.gopher){
	                user.gopher = req.body.gopher;
	            };
                user.save(function(err, updatedUser){
                    if (err){
                        console.log(err);
                    }else{
                        res.json(updatedUser);
                    }
                })
            }
        })
    },

    addFriend: function(req, res){
        User.findOne({_id: req.params.id}, function(err, user){
            if(err){
                res.json(err)
            }else {
                user.request.push(req.session.userId);
                console.log('Friend pushed');
                user.save(function(err, results){
                    if(err){
                        console.log('Request not saved');
                        res.json(err)
                    } else {
                        console.log('Friend Requested');
                        res.sendStatus(200);
                        console.log(results);
                    }
                })
            }
        })
    },

    addScore: function(req, res){
        User.findOne({_id: req.session.userId}, function(err, user){
            if(err){
                console.log(err);
            }else{
                var user;
                pointTotal = user.points + parseInt(req.params.id); 
                user.points = pointTotal;
                console.log('total points is:'+pointTotal);
                user.level++;
                console.log('user object add score.');
                console.log(user);
                user.save(function(err, user){
                    if (err){
                        console.log(err);
                    } else {
                        console.log('users level:');
                        console.log(user.level)
                        res.json(user.level);
                    }
                })
            }
        })
    }

}