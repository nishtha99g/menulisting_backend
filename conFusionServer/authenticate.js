var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User=require('./models/user');
var JWTStrategy=require('passport-jwt').Strategy;
var ExtractJWT=require('passport-jwt').ExtractJwt;
var jwt=require('jsonwebtoken');

var config=require('./config');

exports.local=passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


exports.getToken=function(user){
    return jwt.sign(user,config.secretKey,
        {expiresIn:3600});
};

var opts={};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JWTStrategy(opts,
  (jwt_payload,done)=>{
    console.log("JWT payload",jwt_payload);
    User.findOne({_id:jwt_payload._id},(err,user)=>{
     if(err)
     {
         return done(err,false);
     }
     else if(user){
         return done(null,user);
     }
     else{
         return done(null,false);
     }
    });
    
  }));

  exports.verifyUser=passport.authenticate('jwt',{session:false});

  exports.verifyOrdinaryUser = function (req, res, next) {
    var token =req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, config.secretKey, function (err,decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                req.user= decoded;
                //console.log(req.user); 
                next();
            }
        });
    } else {
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = function (req, res, next) {
    User.findOne({_id:req.user._id},(err,fuser)=>{
    if (err) {
        var er = new Error('User not found');
        er.status = 400;
        return next(er);
    } else if(!fuser.admin){
        var er = new Error('You are not authorized as admin');
        er.status = 403;
        return next(er);
    }
    else
    {
        next();
    }
    });
};
/*
exports.verifyAdmin = function(req,res,next){
	  if (req.user.admin){
			return next();
		} 
		else {
		  var err = new Error('You are not authorized to perform this operation!');
		  err.status = 403;
		  return next(err);
		}
}	*/