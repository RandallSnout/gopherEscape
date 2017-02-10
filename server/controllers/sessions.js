console.log('sessions controller');
// WE NEED TO ADD A FEW lines of code here!
// How does a controller talk to mongoose and get a model?
// Build out the methods in the friendsControllers below
var mongoose = require('mongoose')
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
module.exports = {

    register: function(req,res){
        console.log("In my users");
        if (req.body.password != req.body.password_check){
            var noMatch = {errors: {password: {message:"Passwords did not match, Please try again."}}};
            res.json(noMatch);
        } else {
            var password = req.body.password;
            var user = new User(req.body);
            user.points = 0;
            user.level = 1;
            user.gopher = 'brownGopher';
            user.status = 'online';
            user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
            user.save(function(err,user){
                if (err){
                    res.json(err);
                }else{
                    req.session.user = {
                        name: user.name,
                        status: user.status,
                        _id: user._id
                    };
                    req.session.userId = user._id;
                    res.sendStatus(201);
                }
            });
        }
    },

    login: function(req,res) {
        console.log('server controller reached for login');
        console.log(req.body);
            User.findOne({email: req.body.email}).exec(function (err, user) {
                if(user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        console.log('User password matches');
                        req.session.userId = user._id;
                        // res.sendStatus(201);
                        res.json(user)
                    } else {
                        var wrongUser = {errors: {password: {message:"Password does not match, Please try again."}}};
                        res.json(wrongUser);
                    }
                } else {
                    var noUser = {errors: {password: {message:"User does not exist, Please try again."}}};
                    res.json(noUser);
                }
            })
    },

    logout: function(req, res) {
        req.session.userId = null;
        console.log('logged out');
        console.log(req.session.userId);
        res.sendStatus(401);
    }

}