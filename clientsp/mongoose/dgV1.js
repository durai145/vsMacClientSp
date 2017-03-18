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
var GPASSO_ROLE001MB_Model   = require('./libs/gpassov3').GPASSO_ROLE001MB_Model;
var GPASSO_MEMA001MB_Model   = require('./libs/gpassov3').GPASSO_MEMA001MB_Model;
var GPASSO_RAPG004LB_Model   = require('./libs/gpassov3').GPASSO_RAPG004LB_Model;
var GPASSO_PGDT006MB_Model   = require('./libs/gpassov3').GPASSO_PGDT006MB_Model;
var GPASSO_PGPD009LB_Model   = require('./libs/gpassov3').GPASSO_PGPD009LB_Model;
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
		  prodId: prod._id,
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
/*
		console.log("GPASSO_PRTL002MB_Model.schema.paths " );
		console.log(GPASSO_PRTL002MB_Model.schema.paths.prodId );
		console.log("GPASSO_SID001MB_Model.schema.paths " );
		console.log(GPASSO_SID001MB_Model.schema.paths.prodId );
		console.log( "PRTL002MB:" + prtl);
*/
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
				 
				sid001mb.save(function(err, sid001mb ) {
					if(err)  {
						return log.error("sid001mb:" +err + "[" + sid001mb +"]");
					} else {
						console.log("saved sid001mb :");
						console.log(sid001mb);
					}
				});

				var role=new GPASSO_ROLE001MB_Model({ 
						  athId: 1,
						  mkrId: 1,
						  dtModified: Date(),
						  dtCreated: Date(),
						  status: 'ACTIVE',
						  roleName: 'SEC_ADMIN',
						  prtlId: prtl._id });

						console.log("role : " + role);
						collectionSave(role,"role");
								
						var pggr005mb = new GPASSO_PGGR005MB_Model({ 
								prtlId: prtl._id,
								pageGrpKey: 'HOME_GRP_KEY',
								athId: 1,
								dtModified: Date(),
								mkrId: 1,
								dtCreated: 1,
								pageGrpTitle: 'Home',
								pageGrpId: 'HOME'
								});
				pggr005mb.save(function(err, pggr005mb ) {
					if(err)  {
						return log.error("pggr005mb:" +err + "[" + pggr005mb +"]");
					} else {
						console.log("saved pggr005mb :");
						console.log(pggr005mb);

					var mema=new GPASSO_MEMA001MB_Model({athId: 1,
										dtModified: Date(),
										mkrId: 1,
										dtCreated: Date(),
										activeFlg: 'ACTIVE' ,
										roleId: role._id});

					console.log("Mema: " + mema);	
					collectionSave(mema,"mema");

				console.log(" pggr005mb : " + pggr005mb);

				var rapg=new GPASSO_RAPG004LB_Model({ accessInd: '',
									  athId: 1,
									  dtModified: Date(),
									  mkrId: 1,
									  dtCreated: Date(),
									  pageGrpId: pggr005mb.pageGrpId });
					console.log(" rapg : " + rapg);
					
				var  pgdt= new GPASSO_PGDT006MB_Model({ mkrId: 1,
									  athId: 1,
									  dtCreated: Date(),
									  dtModified: Date(),
									  status: 'ACTIVE',
									  rsltProc: 'schemaRslt.sjson',
									  dtilProc: 'schemaDtil.sjson',
									  critProc: 'schemaCrit.sjson',
									  url: '',
									  rsltJson: 'schemaRslt.sjson',
									  dtilJson: 'schemaDtil.sjson',
									  critJson: 'schemaCrit.sjson',
									  menu: 'SCHEMA',
									  dispOrder: 1,
									  authReqFlg: 'Y',
									  pageType: 'CRIT',
									  pageName: 'SCHEMA',
									  pageKey: 'SHEMA',
									  pageBase: '/clientsp/' }
									);
						console.log(" pgdt : " + pgdt);
						collectionSave(pgdt,"pgdt");

					var pgpd= new GPASSO_PGPD009LB_Model({
							  pageId : pgdt._id ,
							  pageGrpId : pggr005mb._id ,
							  dtModified: Date(),
							  athId:1,
							  dtCreated: Date(),
							  mkrId:1,
							  accessInd: 'Y'});
					console.log(" pgpd : " + pgpd);
					collectionSave(pgpd,"pgpd");

			


			}
			});
		}
		});
	}
	});
});


collectionSave=function(model,modelName) {

         model.save(function(err, model ) {
                 if(err)  {
                         return log.error(modelName+":" +err + "[" + model +"]");
                 } else {
                         console.log("saved %s :", modelName);
                         console.log(model);
                 }

         });


}


setTimeout(function() {
    mongoose.disconnect();
}, 3000);
