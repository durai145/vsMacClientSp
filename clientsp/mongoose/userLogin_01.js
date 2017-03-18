var log                 = require('./libs/log')(module);
var mongoose            = require('./libs/mongoose').mongoose;
var UserModel           = require('./libs/mongoose').UserModel;
var ClientModel         = require('./libs/mongoose').ClientModel;
var DBHSP_GTRN002MB_Model     = require('./libs/mongoose').DBHSP_GTRN002MB_Model;
var DBHSP_GID001MB_Model     = require('./libs/mongoose').DBHSP_GID001MB_Model;
var DBHSP_GRP001MB_Model     = require('./libs/mongoose').DBHSP_GRP001MB_Model;
var AccessTokenModel    = require('./libs/mongoose').AccessTokenModel;
var RefreshTokenModel   = require('./libs/mongoose').RefreshTokenModel;
var faker               = require('Faker');


var inarg="durai";
function checkpwd(inUsername, inPassword, callback ){


DBHSP_GID001MB_Model.findOne({EMAIL_ID: inUsername ,PASSWORD :inPassword } ,function(err, gid001mb) 
{
            if (err) { 
			console.log("error"); 
			callback && callback( flase , {"message" :"Faliure"} );
		} 
		else {


	/*[
			var out  =  gid001mb;
			DBHSP_GRP001MB_Model.findOne({GRP_ID: out.GRP_ID  } ,function(err, grp001mb) 
			{
				    if (err) { callback && callback( null ); } 
					else { 
						out.set('GRP_NAME', grp001mb.GRP_NAME);
						callback && callback(out );

				}
		]*/
			callback(true , gid001mb);
				
			});
		}
        });

}
var chkpwd=0, username="agalyadoss@gmail.com" ,password ="1qaz2wsx" ; 


checkpwd( username,password, function( result, record ){

  console.log( "Return:" +result );
  console.log( "Record:" +record );
});

    
// setup sample data - wouldn't actually use this in production




setTimeout(function() {
    mongoose.disconnect();
}, 3000);
