console.log('levels controller');
// WE NEED TO ADD A FEW lines of code here!
// How does a controller talk to mongoose and get a model?
// Build out the methods in the friendsControllers below
var mongoose = require('mongoose')
var User = mongoose.model('User');
module.exports = {


    getLevel: function(req, res){

        var level = [
            [
                [4,5,4],
                [2,1,2],
                [2,1,2],
                [2,0,2]
            ],

            [
                [4,5,4,4],
                [2,1,2,2],
                [2,1,1,2],
                [2,2,1,2],
                [2,2,0,2]
            ],

            [
                [4,4,5,4],
                [2,2,1,2],
                [2,1,1,2],
                [2,1,2,2],
                [2,1,1,2],
                [2,2,0,2]
            ],

            [
                [4,5,4,4],
                [2,1,2,2],
                [2,1,2,2],
                [2,1,2,2],
                [2,1,1,2],
                [2,2,1,2],
                [2,2,1,2],
                [2,2,0,2]
            ],

            [
                [4,4,4,5,4],
                [2,1,2,1,2],
                [2,1,1,1,2],
                [2,1,2,2,2],
                [2,1,1,2,2],
                [2,2,1,1,2],
                [2,2,1,2,2],
                [2,2,0,2,2]
            ]
        ];
        
        console.log(level[req.params.id-1]);
        res.json(level[req.params.id-1]);

    }

}