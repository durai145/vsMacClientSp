var log                 = require('./libs/log')(module);
var mongoose            = require('./libs/mongoose').mongoose;
var UserModel           = require('./libs/mongoose').UserModel;
var ClientModel         = require('./libs/mongoose').ClientModel;
var GPASSO_GTRN002MB_Model     = require('./libs/gpassov3').GPASSO_GTRN002MB_Model;
var GPASSO_SID001MB_Model     = require('./libs/gpassov3').GPASSO_SID001MB_Model;
var GPASSO_GRP001MB_Model     = require('./libs/gpassov3').GPASSO_GRP001MB_Model;
var GPASSO_PGGR005MB_Model     = require('./libs/gpassov3').GPASSO_PGGR005MB_Model;
var AccessTokenModel    = require('./libs/mongoose').AccessTokenModel;
var RefreshTokenModel   = require('./libs/mongoose').RefreshTokenModel;
var faker               = require('Faker');


var inarg="durai";
function checkpwd(inUsername, inPassword, callback ){


GPASSO_SID001MB_Model.findOne({username: inUsername ,password :inPassword } ,function(err, gid001mb) 
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

			var findObj= { prtlId: "5839a618e035c97b40000002"};

			console.log("findObj" );
			console.log(findObj );

			GPASSO_PGGR005MB_Model.find( findObj , function(err,objPggr005mb){

				if(err) {
					log.error("error on find pggr005mb :" + objPggr005mb);
				} else {
					console.log(" on find pggr005mb : [" + objPggr005mb + "]");
				}

			});

		}
        });

}

var chkpwd=0, username="durai145@live.in" ,password ="1qaz2wsx" ; 


checkpwd( username,password, function( result,response, record ){

  console.log( "Return:" +result );
  console.log( "Response:" +response.message );
  console.log( "record:" + record );
});

    
// setup sample data - wouldn't actually use this in production




setTimeout(function() {
    mongoose.disconnect();
}, 3000);
