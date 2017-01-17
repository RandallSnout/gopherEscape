console.log('User Factory');

app.factory('userFactory', ['$http', function($http) {
    // constructor for our factory
    var users = [];
    var friends = [];
    var user = {};
    var topic = {};
    function UserFactory(){

        this.register = function(newUser,callback){
            console.log('factory' + newUser);
            $http.post('/sessions/reg', newUser).then(function(returned_data){
                console.log(returned_data.data);
                if (typeof(callback) == 'function'){
                    callback(returned_data.data);
                }
            });
        };

        this.login = function(user, callback){
            console.log('Factory Reached for Login');
            console.log(user);
            $http.post('/sessions/log', user).then(function(returned_data){
                console.log(returned_data.data);
                if (typeof(callback) == 'function'){
                    callback(returned_data.data);
                }
            })
        };

        this.logout = function(){
            $http.delete('/sessions/logout');
        };

        this.show = function(callback){
            $http.get('/users').then(function(returned_data){
                user = returned_data;
                callback(user);
            });
        };

        this.showUsers = function(callback){
            $http.get('/allUsers').then(function(returned_data){
                users = returned_data;
                callback(users);
            });
        };

        this.update = function(userID, post,callback){ // what parameters do we need?
            console.log('user ID id'+userID)
            $http.put('/users/'+userID, post).then(function(returned_data){
                console.log(returned_data.data);
                if (typeof(callback) == 'function'){
                    user = returned_data.data;
                    callback(user);
                }
            });
        };

        this.sendRequest = function(friendID){
            $http.put('/friend/'+friendID).then(function(returned_data){
                console.log(returned_data.data);
                if (typeof(callback) == 'function'){
                    user = returned_data.data;
                    callback(user);
                }
            });
        };

        this.showFriends = function(callback){
            $http.get('/allFriends').then(function(returned_data){
                friends = returned_data;
                callback(friends);
            });
        };

        this.showRequests = function(callback){
            $http.get('/allRequests').then(function(returned_data){
                requests = returned_data;
                callback(requests);
            });
        };
        this.getLevel = function(lvlID, callback){
            $http.get('/usersLevel/'+lvlID).then(function(returned_data){
                console.log('Factory Level '+returned_data.data);
                callback(returned_data.data);
            });
        };

    }
    console.log(new UserFactory());
    return new UserFactory();
}]);