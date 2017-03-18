var log                 = require('./libs/log')(module);
var mongoose            = require('./libs/mongoose').mongoose;
var UserModel           = require('./libs/mongoose').UserModel;
var ClientModel         = require('./libs/mongoose').ClientModel;
var DBHSP_GTRN002MB_Model     = require('./libs/mongoose').DBHSP_GTRN002MB_Model;
var DBHSP_GID001MB_Model     = require('./libs/mongoose').DBHSP_GID001MB_Model;
var DBHSP_GRP001MB_Model     = require('./libs/mongoose').DBHSP_GRP001MB_Model;
var AccessTokenModel    = require('./libs/mongoose').AccessTokenModel;
var RefreshTokenModel   = require('./libs/mongoose').RefreshTokenModel;
var GPASSO_GID001MB_Model   = require('./libs/gpassov3').GPASSO_GID001MB_Model;
var faker               = require('Faker');


var inarg="durai";
function checkpwd(inUsername, inPassword, callback ){


GPASSO_GID001MB_Model.findOne({EMAIL_ID: inUsername ,PASSWORD :inPassword } ,function(err, gid001mb) 
{
            if (err) { 
			console.log("error"); 
			callback && callback( false , {"message" :"Faliure"}.toObject(), null );
		} 
		if (!gid001mb )
		{
			callback && callback( false , {"message" :"Faliure"} , null );
		}
		else {
			console.log(gid001mb);
			callback && callback(true , {"message" :"success"}, gid001mb);
		}
        });

}

var chkpwd=0, username="agalyadoss@gmail.com" ,password ="1qaz2wsx" ; 


checkpwd( username,password, function( result,response, record ){

  console.log( "Return:" +result );
  console.log( "Response:" +response.message );
  console.log( "record:" + record );
});

    
// setup sample data - wouldn't actually use this in production




setTimeout(function() {
    mongoose.disconnect();
}, 3000);
