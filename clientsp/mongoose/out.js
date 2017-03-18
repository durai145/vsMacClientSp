[?1049h[?1h=[1;47r[?12;25h[?12l[?25h[27m[23m[m[H[2J[?25l[47;1H"dg.js" 163L, 3845C[1;1H[36mvar[m log[17C= require([31m'./libs/log'[m)(module);
[36mvar[m mongoose[12C= require([31m'./libs/mongoose'[m).mongoose;
[36mvar[m UserModel[11C= require([31m'./libs/mongoose'[m).UserModel;
[36mvar[m ClientModel[9C= require([31m'./libs/mongoose'[m).ClientModel;
[36mvar[m AccessTokenModel    = require([31m'./libs/mongoose'[m).AccessTokenModel;
[36mvar[m RefreshTokenModel   = require([31m'./libs/mongoose'[m).RefreshTokenModel;
[36mvar[m GPASSO_SID001MB_Model   = require([31m'./libs/gpassov3'[m).GPASSO_SID001MB_Model;
[36mvar[m GPASSO_PROD001MB_Model   = require([31m'./libs/gpassov3'[m).GPASSO_PROD001MB_Model;
[36mvar[m GPASSO_PRTL002MB_Model   = require([31m'./libs/gpassov3'[m).GPASSO_PRTL002MB_Model;
[36mvar[m GPASSO_PGGR005MB_Model   = require([31m'./libs/gpassov3'[m).GPASSO_PGGR005MB_Model;
[36mvar[m faker[15C= require([31m'Faker'[m);
[36mvar[m ObjectId = mongoose.Types.ObjectId;

GPASSO_SID001MB_Model.remove([36m{}[m, [36mfunction[m(err) [36m{[m

GPASSO_PROD001MB_Model.remove([36m{}[m, [36mfunction[m(err) [36m{[m[17;9H[33mif[m(err)  [36m{[m[18;17H[33mreturn[m log.error([31m"Unable to remove PROD001MB:"[m +err);[19;9H[36m}
}[m);


[36mvar[m prod=GPASSO_PROD001MB_Model(
[36m{[m
  protocal: [31m'http'[m,
  port: [31m'3000'[m,
  baseHome: [31m'/clientsp/'[m,
  hostname: [31m'myroomexpense'[m,
  dbname: [31m'gpasso'[m,
  dtModified: [32mDate[m(),
  athId: 1,
  dtCreated: [32mDate[m(),
  mkrId: 1,
  prodStDt: [32mDate[m(),
  prodVersion: 1,
  prodName: [31m'myroomexpense'[m
  [36m}[m
);


prod.save([36mfunction[m(err, prod ) [36m{[m[42;9H[33mif[m(err)  [36m{[m[43;17H[33mreturn[m log.error([31m"prod error:"[m+ err);[44;9H[36m}[m [33melse[m [36m{[m[45;17Hconsole.log([31m"Saved prod:"[m);[46;17Hconsole.log(prod);[47;135H1,1[11CTop[1;1H[?12l[?25h[?25l[47;1HType  :quit<Enter>  to exit Vim[47;135H[K[47;135H1,1[11CTop[1;1H[?12l[?25h[?25l[47;135H[K[47;135H1,1[11CTop[1;1H[?12l[?25h[?25l[47;135H[K[47;135H1,1[11CTop[1;1H[?12l[?25h[?25l[47;135H[K[47;135H1,1[11CTop[1;1H[?12l[?25h[?25l[47;135H[K[47;135H1,1[11CTop[1;1H[?12l[?25h[?25l[47;135H2[2;1H[?12l[?25h[?25l[47;135H[K[47;135H2,1[11CTop[2;1H[?12l[?25h[?25l[47;135H[K[47;135H2,1[11CTop[2;1H[?12l[?25h[?25l[47;135H3[3;1H[?12l[?25h[?25l[47;135H4[4;1H[?12l[?25h[?25l[47;135H5[5;1H[?12l[?25h[47;1H[?1l>[?1049lVim: Caught deadly signal HUP
Vim: Finished.
[47;1H