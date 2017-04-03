var log                 = require('./libs/log')(module);
var mongoose            = require('./libs/mongoose').mongoose;
var UserModel           = require('./libs/mongoose').UserModel;
var ClientModel         = require('./libs/mongoose').ClientModel;
var AccessTokenModel    = require('./libs/mongoose').AccessTokenModel;
var RefreshTokenModel   = require('./libs/mongoose').RefreshTokenModel;
var GPASSO_SID001MB_Model   = require('./libs/gpassov3').GPASSO_SID001MB_Model;
var GPASSO_PROD001MB_Model   = require('./libs/gpassov3').GPASSO_PROD001MB_Model;
var GPASSO_PRTL002MB_Model   = require('./libs/gpassov3').GPASSO_PRTL002MB_Model;
var GPASSO_PGGR005MB_Model   = require('./libs/gpassov3').GPASSO_PGGR005MB_Model;
var faker               = require('Faker');
var ObjectId = mongoose.Types.ObjectId;

GPASSO_SID001MB_Model.remove({}, function(err) {

GPASSO_PROD001MB_Model.remove({}, function(err) {
        if(err)  { 
		return log.error("Unable to remove PROD001MB:" +err);
	}
});


var prod=new GPASSO_PROD001MB_Model(
{ 
  protocal: 'http',
  port: '3000',
  baseHome: '/clientsp/',
  hostname: 'myroomexpense',
  dbname: 'gpasso',
  dtModified: Date(),
  athId: 1,
  dtCreated: Date(),
  mkrId: 1,
  prodStDt: Date(),
  prodVersion: 1,
  prodName: 'myroomexpense'
  }
);


prod.save(function(err, prod ) {
        if(err)  { 
		return log.error("prod error:"+ err);
	} else {
		console.log("Saved prod:");
		console.log(prod);
		var prtl=new GPASSO_PRTL002MB_Model({
		  pordId: prod._id,
		  dtModified: Date(),
		  athId: 1,
		  dtCreated: Date(),
		  mkrId: 1,
		  protocal: 'http',
		  port: '3000',
		  baseHome: 'clientsp',
		  hostname: 'myroomexpense.com',
		  dbname: 'myroomexpense.com',
		  prtlStDt: Date(),
		  prtlSt: 'ACTIVE',
		  prtlVersion: '0.1',
		  prtlName: 'MyRoomExpense',
		});

		console.log("GPASSO_PRTL002MB_Model.schema.paths " );
		console.log(GPASSO_PRTL002MB_Model.schema.paths );
		console.log( "PRTL002MB:" + prtl);
		prtl.remove({});
		prtl.save(function(err, prtl ) {
			if(err)  { 
				return log.error("protal:" +err);
			} else {
				console.log("saved prtl :");
				console.log(prtl);
				  var sid001mb = new GPASSO_SID001MB_Model({ prodId: prod._id,
				  primaryIdType: 'SSN',
				  primaryId: '889-12-7763',
				  status: 'ACTIVE',
				  athId: 1,
				  mkrId: 1,
				  dtModified: Date(),
				  dtCreated: Date(),
				  password: '1qaz2wsx',
				  username: 'durai145@live.in',
				  lName: 'Duraimurugan',
				  fName: 'Govindaraj'
				});
				 
				sid001mb.remove({});
				sid001mb.save(function(err, sid001mb ) {
					if(err)  {
						return log.error("sid001mb:" +err + "[" + sid001mb +"]");
					} else {
                console.log("saved sid001mb :");
                console.log(sid001mb);
        }


});

var pggr005mb_1 = new GPASSO_PGGR005MB_Model({ 
  prtlId: prtl._id,
  pageGrpKey: 'HOME_GROUP',
  athId: 1,
  dtModified: Date(),
  mkrId: 1,
  dtCreated: Date(),
  pageGrpTitle: 'Home',
  pageGrpId: 1 });
var pggr005mb_2 = new GPASSO_PGGR005MB_Model({ 
  prtlId: prtl._id,
  pageGrpKey: 'GROUP_SERVICES',
  athId: 1,
  dtModified: Date(),
  mkrId: 1,
  dtCreated: Date(),
  pageGrpTitle: 'Group Servuces',
  pageGrpId: 2 });

console.log("pggr005mb_1:" + pggr005mb_1 );
console.log("pggr005mb_2:" + pggr005mb_2 );

pggr005mb_1.remove({});
pggr005mb_2.remove({});
pggr005mb_1.save(function(err, pggr005mb ) {
        if(err)  {
                return log.error("pggr005mb:" +err + "[" + pggr005mb +"]");
        } else {
                console.log("saved pggr005mb :");
                console.log(pggr005mb);
        }
});


pggr005mb_2.save(function(err, pggr005mb ) {
        if(err)  {
                return log.error("pggr005mb:" +err + "[" + pggr005mb +"]");
        } else {
                console.log("saved pggr005mb :");
                console.log(pggr005mb);
        }
});

			}


		});
	}
	


});

	

	

});





setTimeout(function() {
    mongoose.disconnect();
}, 3000);
