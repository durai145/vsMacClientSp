var log                 = require('./libs/log')(module);
var mongoose            = require('./libs/mongoose').mongoose;
var UserModel           = require('./libs/mongoose').UserModel;
var ClientModel         = require('./libs/mongoose').ClientModel;
var GPASSO_GTRN002MB_Model     = require('./libs/gpassov3').GPASSO_GTRN002MB_Model;
var GPASSO_SID001MB_Model     = require('./libs/gpassov3').GPASSO_SID001MB_Model;
var GPASSO_GRP001MB_Model     = require('./libs/gpassov3').GPASSO_GRP001MB_Model;
var GPASSO_PGGR005MB_Model     = require('./libs/gpassov3').GPASSO_PGGR005MB_Model;
var GPASSO_PROD001MB_Model   = require('./libs/gpassov3').GPASSO_PROD001MB_Model;
var GPASSO_PRTL002MB_Model   = require('./libs/gpassov3').GPASSO_PRTL002MB_Model; 
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

			console.log("prodId:" +gid001mb.prodId);

			GPASSO_PRTL002MB_Model.find({ prodId : gid001mb.prodId}  , function (err, prtl) {
			
				if(err) {
					log.error("error on find prtl001mb :" + prtl);
				} else {
					console.log(" on find prtl001mb : [" + prtl + "]");
						var findObj= { prtlId: prtl[0]._id};

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
			console.log(gid001mb);
			callback && callback(true , {"message" :"success"}, gid001mb);

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
