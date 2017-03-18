var log                 = require('./libs/log')(module);
var mongoose            = require('./libs/mongoose').mongoose;
var UserModel           = require('./libs/mongoose').UserModel;
var ClientModel         = require('./libs/mongoose').ClientModel;
var DBHSP_GTRN002MB_Model     = require('./libs/mongoose').DBHSP_GTRN002MB_Model;
var AccessTokenModel    = require('./libs/mongoose').AccessTokenModel;
var RefreshTokenModel   = require('./libs/mongoose').RefreshTokenModel;
var faker               = require('Faker');

UserModel.remove({}, function(err) {
    var user = new UserModel({ username: "andrey", password: "simplepassword" });
    user.save(function(err, user) {
        if(err) return log.error(err);
        else log.info("New user - %s:%s",user.username,user.password);
    });

    for(i=0; i<4; i++) {
        var user = new UserModel({ username: faker.random.first_name().toLowerCase(), password: faker.Lorem.words(1)[0] });
        user.save(function(err, user) {
            if(err) return log.error(err);
            else log.info("New user - %s:%s",user.username,user.password);
        });
    }
});
DBHSP_GTRN002MB_Model.remove({}, function(err) {
    var DBHSP_GTRN002MB = new DBHSP_GTRN002MB_Model({ GRP_ID: "1", TRAN_ST: "01-jan-2015" });
    DBHSP_GTRN002MB.save(function(err, DBHSP_GTRN002MB) {
        if(err) return log.error(err);
//        else log.info("GTRN002MB - %s:%s",user.username,user.password);
            else log.info("GTRN002MB - %s:%s",DBHSP_GTRN002MB.GRP_ID,DBHSP_GTRN002MB.TRAN_ST);
    });

    for(i=0; i<4; i++) {
        var DBHSP_GTRN002MB = new DBHSP_GTRN002MB_Model({ GRP_ID: "1",  tran_st: "01-jan-2015"});
        DBHSP_GTRN002MB.save(function(err, DBHSP_GTRN002MB) {
            if(err) return log.error(err);
            else log.info("GTRN002MB - %s:%s",DBHSP_GTRN002MB.GRP_ID,DBHSP_GTRN002MB.TRAN_ST);
        });
    }
});

ClientModel.remove({}, function(err) {
    var client = new ClientModel({ name: "OurService iOS client v1", clientId: "mobileV1", clientSecret:"abc123456" });
    client.save(function(err, client) {
        if(err) return log.error(err);
        else log.info("New client - %s:%s",client.clientId,client.clientSecret);
    });
});
AccessTokenModel.remove({}, function (err) {
    if (err) return log.error(err);
});
RefreshTokenModel.remove({}, function (err) {
    if (err) return log.error(err);
});

setTimeout(function() {
    mongoose.disconnect();
}, 3000);
