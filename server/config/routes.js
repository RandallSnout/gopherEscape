var users = require('../controllers/users.js');
var sessions = require('../controllers/sessions.js');
var levels = require('../controllers/levels.js');
var messages = require('../controllers/messages.js');

function loginAuthentication(req,res,next){
    if (req.session.userId){
        next();
    }else{
        res.status(401).send("User not found");
    }
}

module.exports = function(app){
    app.post('/sessions/reg', sessions.register);
    app.post('/sessions/log', sessions.login);
    app.use(loginAuthentication);
    app.get('/users', users.show);
    app.get('/levelLength', levels.levelAmount);
    app.get('/allUsers', users.showAll);
    app.get('/allFriends', users.showFriends);
    app.get('/allRequests', users.showRequests);
    app.put('/usersScore/:id', users.addScore);
    app.get('/usersLevel/:id', levels.getLevel);
    app.get('/friendInfo/:id', users.findFriend);
    app.put('/users/:id', users.update);
    app.put('/friend/:id', users.addFriend);
    app.put('/confirmFriend/:id', users.confirmFriend);
    app.post('/addmessage/:id', messages.addmessage);
    app.get('/messages', messages.index);
    app.get('/frndMessages/:id', messages.friendMess);
    app.delete('/denyFriend/:id', users.denyFriend);
    app.delete('/removeFriend/:id', users.removeFriend);
    app.delete('/sessions/logout', sessions.logout);
};