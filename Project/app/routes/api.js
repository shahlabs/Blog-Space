var User = require('../models/user');

module.exports = function(router) {

//Register
  router.post('/users', function(req, res){
  		var user = new User();
  		user.username = req.body.username;
  		user.password = req.body.password;
  		user.email = req.body.email;
  		if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''){
  			//res.send("Ensure all the 3 fields are provided");
  			res.json({success: false, message: "Ensure all the 3 fields are provided"});
  		}else{
  			user.save(function(err){
    			if(err) {
    			 //	res.send("Username or email already exists! ");
    			 	res.json({success: false, message: "Username or email already exists! "});
    			}else {
    				res.json({success: true, message:"User created!"});
    			}
  		  });
  		}
  	});

//Login
    router.post('/authenticate', function(req, res){
    		User.findOne({username: req.body.username}).select('email username password').exec(function(err, user){
    			if (err) throw err;

    			if(!user){
    				res.json({success:false, message:"Couldn't authenticate user"});
    			}else{

    				if(req.body.password){
    					var validPassword = user.comparePassword(req.body.password);
    				}else{
    					 res.json({success: false, message: "No password provided! "});

    				}
    				if(!validPassword){
    					res.json({success: false, message: "Couldn't authenticate! "});
    				}else{
    					var token = jwt.sign({username: user.username, email: user.email}, secret, {expiresIn: '24h'});
    					res.json({success: true, message:"User authenticated!", token: token});

    				}
    			}
    		});
    	});

    return router;

}
