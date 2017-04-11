/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([

    './controllers/index'
    ,'./services/index'
   /* ,'./directives/index'
      ,'./filters/index'
      
    */

], function (controllers,services) {
    'use strict';

//console.log('controllers in app');
//console.log(controllers);

//console.log('ufi in app');
//console.log(ufi);

    var webApp= angular.module('app', [
         'controllers'
        ,'ngRoute'
        ,'toaster' 
        ,'services'
        ,'ui.router'
        ,'ngAnimate'
        //,'ussService'
        //,'$http'
      //  , 'require'
        //,'ufi'
        //,''
        /*,'app.directives'
        ,'app.filters'
        ,'app.services'
        */
    ]);





 

    webApp.provider('heaerieUssService', function heaerieUssServiceProvider() {
  var GenHtmlTemplateFromSJson = false;





this.getDataType=function(tag)
 {
  var tagLib={
  ﻿      "C1"     :   ﻿"ascii"
,      "C2"     :   ﻿"ascii"
,      "C3"     :   ﻿"ascii"
,      "C4"     :   ﻿"ascii"
,      "C5"     :   ﻿"ascii"
,      "C6"     :   ﻿"ascii"
,      "C7"     :   ﻿"ascii"
,      "C8"     :   ﻿"ascii"
,      "C9"     :   ﻿"ascii"
,      "CA"   :   ﻿"ascii"
,      "CB"   :   ﻿"ascii"
,      "CC"   :   ﻿"ascii"
,      "CD"   :   ﻿"ascii"
,      "CF"   :   ﻿"ascii"
,      "DF01"   :   ﻿"ascii"
,      "DF02"   :   ﻿"ascii"
,      "DF03"   :   ﻿"ascii"
,      "DF04"   :   ﻿"ascii"
,      "DF05"   :   ﻿"ascii"
,      "DF06"   :   ﻿"ascii"
,      "DF07"   :   ﻿"ascii"
,      "DF08"   :   ﻿"ascii"
,      "DF09"   :   ﻿"ascii"
,      "DF0A"   :   ﻿"ascii"
,      "DF0B"   :   ﻿"ascii"
,      "DF0C"   :   ﻿"ascii"
,      "DF0D"   :   ﻿"ascii"
,      "DF0E"   :   ﻿"ascii"
,      "DF0F"   :   ﻿"ascii"
,      "DF11"   :   ﻿"ascii"
,      "DF12"   :   ﻿"ascii"
,      "DF13"   :   ﻿"ascii"
,      "E1"   :   ﻿"ascii"
  };

  return tagLib[tag.toUpperCase()]; 
 }

 this.getTagDescr=function(tag)
 {
  var tagLib={
  ﻿      "C1"     :   "group"
,      "C2"     :   "name"
,      "C3"     :   "label"
,      "C4"     :   "task"
,      "C5"     :   "desc"
,      "C6"     :   "htmlType"
,      "C7"     :   "entitle"
,      "C8"     :   "enttlname"
,      "C9"     :   "mndf"
,      "CA"   :   "dataType"
,      "CB"   :   "cclass"
,      "CC"   :   "parent"
,      "CD"   :   "parentHtmlType"
,      "CF"   :   "validate"
,      "DF01"   :   "dflt"
,      "DF02"   :   "min"
,      "DF03"   :   "max"
,      "DF04"   :   "tips"
,      "DF05"   :   "onkeyup"
,      "DF06"   :   "onchange"
,      "DF07"   :   "onkeydown"
,      "DF08"   :   "onkeypress"
,      "DF09"   :   "onclick"
,      "DF0A"   :   "onblure"
,      "DF0B"   :   "listVal"
,      "DF0C"   :   "help"
,      "DF0D"   :   "helpLink"
,      "DF0E"   :   "xml"
,      "DF0F"   :   "xmlname"   
,      "DF11"   : "Xpath"
,      "DF12"   : "maxCol"
,      "DF13"   : "col"
,      "E1"   : "childs"
  };

  return  tagLib[tag.toUpperCase()]; 
 }



 this.getTag =function(tag)
 {
  var tagLib={
        "group" : ﻿      "C1"   
,   "name"  :      "C2"   
,   "label" :      "C3"   
,   "task"  :      "C4"   
,   "desc"  :      "C5"   
,   "htmlType"  :      "C6"   
,   "entitle" :      "C7"   
,   "enttlname" :      "C8"   
,   "mndf"  :      "C9"   
,   "dataType"  :      "CA"  
,   "cclass"  :      "CB"  
,   "parent"  :      "CC"  
,   "parentHtmlType"  :      "CD"  
,   "validate"  :      "CF"  
,   "dflt"  :      "DF01"  
,   "min" :      "DF02"  
,   "max" :      "DF03"  
,   "tips"  :      "DF04"  
,   "onkeyup" :      "DF05"  
,   "onchange"  :      "DF06"  
,   "onkeydown" :      "DF07"  
,   "onkeypress"  :      "DF08"  
,   "onclick" :      "DF09"  
,   "onblure" :      "DF0A"  
,   "listVal" :      "DF0B"  
,   "help"  :      "DF0C"  
,   "helpLink"  :      "DF0D"  
,   "xml" :      "DF0E"  
,   "xmlname"     :      "DF0F"  
, "Xpath" :      "DF11"  
, "maxCol"  :      "DF12"  
, "col" :      "DF13"  
, "childs"  :      "E1"                          
  }

  return tagLib[tag]; 
 }




  this.FunTest=function()
  {
    alert("Test");
  }


this.intToHexChar= function(inp)
{
  var lib=
  {
     0:'0'
    ,1:'1'
    ,2:'2'
    ,3:'3'
    ,4:'4'
    ,5:'5'
    ,6:'6'
    ,7:'7'
    ,8:'8'
    ,8:'8'
    ,9:'9'
    ,10:'A'
    ,11:'B'
    ,12:'C'
    ,13:'D'
    ,14:'E'
    ,15:'F'
  }

  return lib[inp];
}

this.bytesToAscii =function(inpBytes)
{
  var rtString= "";
  for (var i=0; i< inpBytes.length; i++)
  {
      rtString+= String.fromCharCode(inpBytes[i]);
  }

  return rtString;
}

this.ByteSubstr1 = function(byteArr,start)
{
  var rtbyte=[];
  for(var i=start; i< byteArr.length ; i++)
  {
    rtbyte.push(byteArr[i]);
  }

  return rtbyte;
}

this.ByteSubstr2 = function(byteArr,start,endlength)
{
  var rtbyte=[];
  for(var i=start; i<  byteArr.length  && i<endlength ; i++)
  {
    rtbyte.push(byteArr[i]);

  }

  return rtbyte;
}

this.parseTVL = function(inpBytes)
{

  var parentJson=[];
  var s=0x80;
  var  classVal=0;
  var  primitiveOrConst=0;
  var tagLen=0;
  var tagByte=[];
  var highByte=0;
  var lowByte=0;
  var mode=["tag", "length", "value"];
  var modeCnt=0;
  var leadingOctet=1; //subsequent
  //.charCodeAt()
  var firstBit=0;
  var nextSubsequent=0
  var nextSubSeqByte=0;
  var lengthSize=0;
  var len=[];
  var lenByte=[];
  var dataByte=[];
  var data=[];
  var ascii=[];
  var lengthHeaderCnt=0;

  for (var i=0; i < inpBytes.length ; i++)
  {
     firstBit=0;
     highByte=0;
     lowByte=0;
     s=0x80;      
     nextSubSeqByte=0;

    //pre processing

     for (var b=8; b>0; b--)
     {
        if(inpBytes[i]&s)
        {
        if(b==8 )
        {

          
          firstBit=firstBit|s;
        }


         if(b==8 || b==7 || b == 6 || b == 5)
            {
             // if(inpBytes[i]&s)
              highByte=highByte|s;
            }
            if(b==4 || b==3 || b == 2 || b == 1)
            {
              //if(inpBytes[i]&s)
              lowByte=lowByte|s;
            }
             if(b==5||b==4 || b==3 || b == 2 || b == 1)
            {
              //if(inpBytes[i]&s)
              nextSubSeqByte=nextSubSeqByte|s;
            }

        if(modeCnt ==0)
        {
            if(leadingOctet==1)
            {

                if(b==8 || b==7)
                {

                  
                  classVal=classVal|s;
                }
                 if(b==6)
                {
                  //if(inpBytes[i]&s)
                  primitiveOrConst=primitiveOrConst|s;
                }
            }
           
           
        }
        else if (modeCnt == 1 )
      {
          if (leadingOctet == 1)
          { 

            if(firstBit == 1)
            {
              if(b==4 || b==3 || b == 2 || b == 1)
              {
                lengthSize=lengthSize|s;
              }
            }

          }

      }
      else if (modeCnt >= 2)
      {
        if(b==8 || b==7 || b == 6 || b == 5)
            {
             // if(inpBytes[i]&s)
              highByte=highByte|s;
            }
            if(b==4 || b==3 || b == 2 || b == 1)
            {
              //if(inpBytes[i]&s)
              lowByte=lowByte|s;
            }
      }
    }

        s=s>>1;
        
     }
     highByte=highByte>>4;
     firstBit=firstBit>>7;
    //decision processing  part
    
    if (modeCnt== 0 )
    {
      if (( leadingOctet == 1 && nextSubSeqByte == 0x1F )|| ( leadingOctet == 0 && firstBit ==1)  )
      {
        nextSubsequent=1;
      }
      else
      {
        nextSubsequent=0;
      }

    }
    else 
    if(modeCnt ==1) //length 
    {
        
         if(firstBit ==1 )
         {
          lengthSize+=1;
          nextSubsequent=1;
         }
         else
         {
          nextSubsequent=0;
         }

    }

    //Action Part
    if( leadingOctet ==1   ||nextSubsequent ==1)
    {
        if (modeCnt ==0)
        {
          tagByte.push(this.intToHexChar(highByte));
          tagByte.push(this.intToHexChar(lowByte));
       // nextSubsequent=1;
          tagLen++;
        }
        else if (modeCnt ==1)
        {
           len.push(this.intToHexChar(highByte));
           len.push(this.intToHexChar(lowByte));
           lenByte.push(highByte<<4|lowByte);
           lengthSize--;
           tagLen++;
        }
        else if (modeCnt >= 2)
        {
           data.push(this.intToHexChar(highByte));
           data.push(this.intToHexChar(lowByte));

          // ascii.push(String.fromCharCode(inpBytes[i])) ;
           dataByte.push(inpBytes[i]);
           tagLen++;
        }
    }

    if (modeCnt ==0 && nextSubsequent ==0 && leadingOctet ==0)
        {
          tagByte.push(this.intToHexChar(highByte));
          tagByte.push(this.intToHexChar(lowByte));
       // nextSubsequent=1;
          tagLen++;
        }

     if(( modeCnt == 1 && nextSubsequent == 0 ) && (leadingOctet !=1))
     {
          len.push(this.intToHexChar(highByte));
           len.push(this.intToHexChar(lowByte));
           lenByte.push(highByte<<4|lowByte);
           lengthSize--;
           tagLen++;
     }
  // post procesing   
     if(leadingOctet ==1 )
     {
      leadingOctet=0;
     }
     if(nextSubsequent ==0)
     {
        leadingOctet=1;
        modeCnt++;
        tagLen=0;
     }

   //console.log(mode[modeCnt]);


  }
 

     classVal= classVal>>6;
     primitiveOrConst=primitiveOrConst>>5;

     var parentObj      = [];
     var lenVal       =this.getLengthVal(lenByte);
     var dataHex       =  this.hexArrToString(data);
      var remData     = dataHex.substr(lenVal*2); 
      var value       = dataHex.substr(0,lenVal*2); 
      var valueByte   =this.ByteSubstr2(dataByte,0,lenVal);
      var remDataByte =this.ByteSubstr1(dataByte,lenVal);
      var tag         =this.hexArrToString(tagByte);
          ascii=this.bytesToAscii(valueByte) ;
     parentObj={    'class'             : classVal 
                    ,'primitiveOrConst' : primitiveOrConst
                    //,'tagByte'          : tagByte
                    ,'tag'              : tag
                     ,'lenVal'              : lenVal
                    ,'tagDescr'         :  this.getTagDescr(tag)
                    
                   // ,'len'              : len
                   // ,'lengthSize'              : lengthSize
                  //  ,'lenByte'          : lenByte 
                    ,'lenVal'           : lenVal
                   // ,'data'             : dataHex
                    //,'dataByte'         : dataByte
                  //  ,'remData'          : remData
                    ,'value'            : value
                    ,'ASCII'            : ascii //this.hexArrToString(this.hexToBytes(dataHex))
                    //, 'valueByte'       : valueByte
                   // , 'remDataByte'     : remDataByte
                    ,'childs' : []
               };


  

  if(primitiveOrConst == 1)
  {
    //var childJson = 
      parentObj.childs=this.parseTVL(valueByte);
  }
   parentJson.push(parentObj);

if(remDataByte.length >0)
{
 if(remDataByte[0] == 0x90 && remDataByte[1] == 0x00 && remDataByte.length ==2 )
  {
    alert("No more ");
  }
  else
  {
    var childJsonS = this.parseTVL(remDataByte);
    for(var c=0; c< childJsonS.length ; c++)
     parentJson.push(childJsonS[c]);
  }

}

  return parentJson;
}

this.stringToByteArray=function(str) {
    var b = [], i, unicode;
    for(i = 0; i < str.length; i++) {
        unicode = str.charCodeAt(i);
        // 0x00000000 - 0x0000007f -> 0xxxxxxx
        if (unicode <= 0x7f) {
            b.push(String.fromCharCode(unicode));
        // 0x00000080 - 0x000007ff -> 110xxxxx 10xxxxxx
        } else if (unicode <= 0x7ff) {
            b.push(String.fromCharCode((unicode >> 6) | 0xc0));
            b.push(String.fromCharCode((unicode & 0x3F) | 0x80));
        // 0x00000800 - 0x0000ffff -> 1110xxxx 10xxxxxx 10xxxxxx
        } else if (unicode <= 0xffff) {
            b.push(String.fromCharCode((unicode >> 12) | 0xe0));
            b.push(String.fromCharCode(((unicode >> 6) & 0x3f) | 0x80));
            b.push(String.fromCharCode((unicode & 0x3f) | 0x80));
        // 0x00010000 - 0x001fffff -> 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
        } else {
            b.push(String.fromCharCode((unicode >> 18) | 0xf0));
            b.push(String.fromCharCode(((unicode >> 12) & 0x3f) | 0x80));
            b.push(String.fromCharCode(((unicode >> 6) & 0x3f) | 0x80));
            b.push(String.fromCharCode((unicode & 0x3f) | 0x80));
        }
    }

    return b;
}


this.hexToBytes=function(inpStrArr)
{

  //var rtStr=new Int8Array()
var bytes = new Uint8Array(inpStrArr.length/2);
j=0;
  for(var i=0; i< inpStrArr.length ; i +=2)
  {

    // rtStr.push(String.fromCharCode(this.hexToByte(inpStrArr[i]) <<4| this.hexToByte(inpStrArr[i+1])));
     bytes[j++]=this.hexToByte(inpStrArr[i]) <<4| this.hexToByte(inpStrArr[i+1]);
  }

  return bytes;
}

this.doTvl=function(val)
{
  var retVal=val;
  var inpStrArr=this.stringToByteArray(val);

  var respJson=[];
var j=0;

var pattern=/[0-9A-Fa-f]/i;



if( pattern.test(inpStrArr))
{

if(inpStrArr.length %2 == 0)
{
var inpBytes = hexToBytes(inpStrArr);

 respJson= parseTVL(inpBytes);

}

}
else
{
  respJson=[{"error" :"invalid hex bytes" }]
}
   
  return respJson ;

}


this.getLengthVal=function(inp)
{
var retVal=0;
if(inp.length==1)
{
retVal=inp[0]
}
else
{
  for(var i=inp.length; i>=0  ; i--)
  {
    inp[i-1] =inp[i-1] & 0x7F;

  //retVal= retVal+ (inp[i] << (inp.length-i+1)*8 ) ;
    retVal= retVal+ (inp[i-1] << (inp.length-i)*7 );
  }
}

return retVal;
}
this.hexArrToString = function(hexArr)
{
  var hexStr="";
  for(var i=0; i< hexArr.length ; i++)
  {
    hexStr+=hexArr[i];
  }

  return hexStr;
}

this.hexToBytes=function(inpStrArr)
{

  //var rtStr=new Int8Array()
var bytes = new Uint8Array(inpStrArr.length/2);
var j=0;
  for(var i=0; i< inpStrArr.length ; i +=2)
  {

    // rtStr.push(String.fromCharCode(this.hexToByte(inpStrArr[i]) <<4| this.hexToByte(inpStrArr[i+1])));
     bytes[j++]=this.hexToByte(inpStrArr[i]) <<4| this.hexToByte(inpStrArr[i+1]);
  }

  return bytes;
}
this.h2d=function(h) {return parseInt(h,16);}

this.hexToByte = function(inpChar)
{

return this.h2d(inpChar);
}



this.pareseTvlToSchema=function(jsonObj)
{
  var schemaJson = [];
  var  j=0;
  var NeedEmptyChilds=true;
 // alert(jsonObj.length);
var tempJsonstr= '[{';
  for(var i=0; i<jsonObj.length ; i++)
  {
    //  alert("1");
      //jsonObj[i]["tag"]);

        var tag= jsonObj[i]["tag"];
        var valueKey=this.getDataType(tag);
        var value= jsonObj[i]["value"];
        var key =jsonObj[i]["tagDescr"];
        var childs =jsonObj[i]["childs"];
        var ascii =jsonObj[i]["ASCII"];


        if( valueKey.toUpperCase() == "ASCII")
        {
          value=ascii;
        }

      if(tag =="e1" ||tag =="E1" )
      {
        NeedEmptyChilds=false;
       var childJson= this.pareseTvlToSchema(childs);
       // key = "childs";
         //schemaJson.push({'childs':childJson});
          if( j==0 )
        {
         tempJsonstr+= ' "' + key +'" : ' +  JSON.stringify(childJson)+ '';
       }
       else
       {
          tempJsonstr+= ', "' + key +'" : ' +  JSON.stringify(childJson)+ '';
     
       }
       j++;
       //schemaJson["childs"]=$scope.pareseTvlToSchema(childs);
      }
      else 
      {

       //alert( key +" " +value);
        if( j==0 )
        {
          tempJsonstr+= ' "' + key +'" : "' +  value+ '"';
        }
        else
        {
          tempJsonstr+= ', "'+ key +'" : "' +  value+ '"';
        }
        j++;

      }
  }
if(NeedEmptyChilds == true)
{
  if( j==0 )
  {
    tempJsonstr+=  " 'childs':[]";
  }
  else
  {
    tempJsonstr+= ", 'childs':[]";
  }

}

tempJsonstr+= "}]";
var tempJson= eval(tempJsonstr);

        schemaJson.push(tempJson[0]);
  return schemaJson;
}







  this.GenHtmlTemplateFromSJson = function(jsonSchema,value,mode) {
  
  var USS=require("ufi.core").USS;
  var ufiframegen=require("ufi.frameGen");
  var ufivalidate=require("ufi.validate");
  var $=require("jquery");
  var us= new ufiframegen.FG();
  var schemaJson=eval('[{"group":"USS","name":"basicDet","label":"Basic Details","task":"EA","desc":"","htmlType":"PAGE","entitle":"NONREADONLY", maxCol:2, col: 1,"enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"name","label":"Name ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"name1","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"bodyType","label":"Body Type","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"complexion","label":"complexion","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"age","label":"Age ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"NUMBER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"dob","label":"Date of Birth","task":"NONE","desc":"","htmlType":"DATE","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"DATE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"DD/MM/YYYY or DD/MON/YYYY","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"phyStaus","label":"Physical Status ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"height","label":"Height ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"weight ","label":"Weight ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"motherTongue","label":"Mother Tongue ","task":"NONE","desc":"","htmlType":"DIV","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"DIV","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"maritalStaus","label":"Marital Status ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|U|Unmarried|NM|Never married","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"eatingHabits","label":"Eating Habits ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|NV|Non Vegetarian|V|Vegetarian","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"drinkingHabits","label":"Drinking Habits ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|ND|Non-drinker|D|Drinker","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"smokingHabits","label":"Smoking Habits ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|NS|Non-smoker|S|Smoker","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]');



  var result=$.ajax({
        type: "POST",
        url: "/jsonSchema/"+jsonSchema+".json",
        cache: false,
        async: false
    }).responseText;
        
 // alert('Inital Load');

 

 //alert(this.parseTVL(this.hexToBytes(result)));

//alert("Inital Load: "+ "/jsonSchema/"+jsonSchema+".bson" +": "+result);
/*
var genObj=this.pareseTvlToSchema(this.parseTVL(this.hexToBytes(result)));
//alert(JSON.stringify(genObj[0].childs));
console.log(JSON.stringify(genObj[0].childs));
 */
  schemaJson=eval(result);//genObj[0].childs;
    GenHtmlTemplateFromSJson =USS;

    


   // alert(GenHtmlTemplateFromSJson);

   var usResource= eval(    "[{" +us.frameGenerationResoure(schemaJson[0].childs,
  schemaJson[0]
)  +"}]" );


var  usListVal=eval("[{"+us.frameGenerationListVal(schemaJson[0].childs,
    schemaJson[0]
)  + "}]"); 



var OutJson=    eval( "[{" +us.frameGenerationJson(schemaJson[0].childs,
  schemaJson[0]
) +"}]");

var func=value;
//alert(func);
var inpUsListVal  = eval("usListVal[0]."+ schemaJson[0].name) ;
var inpUsResource = eval("usResource[0]."+ schemaJson[0].name) ;
var inpOutJson    = eval("OutJson[0]."+ schemaJson[0].name) ;
var ussScript=us.frameGeneration(inpUsListVal
                                              ,inpUsResource
                                              ,inpOutJson 
                                              ,schemaJson[0].childs
                                              ,schemaJson[0]
                                              ,0
                                              ,func
                                              ,0
                                              ,mode
                                          );


  ussScript+="return USSContainer0";
    console.log('-------------ussScript------------');
    console.log(ussScript);

   // try
    {
      var dynFGCall=(new Function("return function(us) {" + ussScript + "};"))();
   
      var appendObj=dynFGCall(us);

       console.log('appendObj.innerHTML');
      console.log(appendObj.innerHTML);

      //return "<div> thsis dashboard from heaerieUssServiceProvider </div>";
      return  "<div class='pageLayout'> <div class='bcontainer'>"+appendObj.innerHTML + "</div></div>";
     
    }
  /*  catch(e)
    {
      alert('Core App:' + e);
    }
*/
  };

  this.$get = ["apiToken", function heaerieUssServiceFactory(apiToken) {

    // let's assume that the heaerieUssService constructor was also changed to
    // accept and use the GenHtmlTemplateFromSJson argument
    return new heaerieUssService(apiToken, GenHtmlTemplateFromSJson);
  }];
});

/*
webApp.config(["heaerieUssServiceProvider", function(heaerieUssServiceProvider) {
  heaerieUssServiceProvider.GenHtmlTemplateFromSJson(true);
  console.log('heaerieUssServiceProvider.GenHtmlTemplateFromSJson');
  console.log(heaerieUssServiceProvider.GenHtmlTemplateFromSJson);
}]);

*/
     webApp.config(['$routeProvider', '$locationProvider', '$httpProvider' ,'$stateProvider','$urlRouterProvider','heaerieUssServiceProvider','$injector'
          ,function  ($routeProvider,$locationProvider,$httpProvider,$stateProvider,$urlRouterProvider ,heaerieUssServiceProvider,$injector
            ) {
        // body...
        console.log('$stateProvider');
        console.log($stateProvider);
        console.log($urlRouterProvider);
       // console.log(ussService);


      

      

       //alert(heaerieUssServiceProvider.GenHtmlTemplateFromSJson('Y'));
          $stateProvider.state('login', 
        {
            url         : '/www/'
           ,views:{

             'pageMainContext' :
              {                
               
                templateUrl : 'js/lib/views/loginView.html'
                ,controller :  'naviController'
               // templateUrl : 'view/loginView.html'
              }
            }
        });

          $stateProvider.state('dashboard', 
        {
            url         : '/dashboard/'
           ,views:{
              'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@dashboard' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','N',"FULL") //EIDT and ADD
                //template : 'this is test'
                templateUrl : 'js/lib/views/dashboardView.html'

               ,controller :  'dashboardController'
              }

             
            }
        });




         $stateProvider.state('SchemaGenerator', 
        {
            url         : '/SchemaGenerator/'
           ,views:{
              'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@SchemaGenerator' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','N',"FULL") //EIDT and ADD
                //template : 'this is test'
                templateUrl : 'js/lib/views/SchemaGenerator.html'

               ,controller :  'SchemaGeneratorController'
              }

             
            }
        });

//basicDet/USSAdd

 $stateProvider.state('basicDetUSSAdd', 
        {
            url         : '/basicDetUSSAdd/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@basicDetUSSAdd' :
              {                
               
                template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','Y' ,'ADD')
                ,controller :  'basicDetController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
            ,params: {
    $basicDet: { }
            }

        });


//basicDetUSSSave


$stateProvider.state('SchemaGeneratorView', 
        {
            url         : '/SchemaGeneratorView/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
               
              }
              ,

              'pageSubContext@SchemaGeneratorView' :
              {                
               
                templateUrl : 'js/lib/views/SchemaGeneratorView.html'
                ,controller :  'SchemaGeneratorController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
        });
$stateProvider.state('SchemaGenerator', 
        {
            url         : '/SchemaGenerator/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
               
              }
              ,

              'pageSubContext@SchemaGenerator' :
              {                
               
                templateUrl : 'js/lib/views/SchemaGenerator.html'
                ,controller :  'SchemaGeneratorController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }

            }
          }
              );
$stateProvider.state('KeyBoard', 
        {
            url         : '/KeyBoard/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
               
              }
              ,

              'pageSubContext@KeyBoard' :
              {                
               
                templateUrl : 'js/lib/views/keyBoard.html'
                ,controller :  'keyBoardController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
        });


$stateProvider.state('basicDetUSSSave', 
        {
            url         : '/basicDetUSSSave/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@basicDetUSSSave' :
              {                
               
                template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','Y' ,'SAVE')
                ,controller :  'basicDetController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
             ,params: {
    $basicDet: { }
            }
        });

  $stateProvider.state('basicDetUSSNew', 
        {
            url         : '/basicDetUSSNew/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@basicDetUSSNew' :
              {                
               
                template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','Y' ,'NEW')
                ,controller :  'basicDetController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
             ,params: {
    $basicDet: { }
            }
        });

  $stateProvider.state('basicDetUSSView', 
        {
            url         : '/basicDetUSSView/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@basicDetUSSView' :
              {                
               
                template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','N',"FULL")
                ,controller :  'basicDetController'
                //template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
             ,params: {
    $basicDet: { }
            }
        });



$stateProvider.state('basicDetUSSEdit', 
        {
            url         : '/basicDetUSSEdit/'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
               ,controller :  'naviController'
              }
              ,

              'pageSubContext@basicDetUSSEdit' :
              {                
               
                template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','Y','SAVE')
                //template : '<form name="myForm" > <label for="exampleInput">Pick a date in 2013:</label> <input type="date" id="exampleInput" name="input" ng-model="example.value"placeholder="yyyy-MM-dd" min="2013-01-01" max="2016-12-31" required /> <div role="alert"> <span class="error" ng-show="myForm.input.$error.required"> Required!</span> <span class="error" ng-show="myForm.input.$error.date"> Not a valid date!</span> </div> <tt>value = {{example.value | date: "yyyy-MM-dd"}}</tt><br/> <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br/> <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br/> <tt>myForm.$valid = {{myForm.$valid}}</tt><br/> <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br/> </form>'//heaerieUssServiceProvider.GenHtmlTemplateFromSJson('Y','SAVE') ,controller :  'basicDetController'
                ,controller :  'basicDetController'//template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
            ,params: {
    $basicDet: { }
            }
        });


 $stateProvider.state('signup', 
        {
            url         : '/signup/'
           ,views:{
              'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/signupView.html'
               ,controller :  'signupController'
              }
              ,

              'pageSubContext@signup' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','N',"FULL") //EIDT and ADD
                //template : 'this is test'
               // templateUrl : 'js/lib/views/dashboardView.html',controller :  'dashboardController'
                template:  "<center> <div style='width:600px'>" + heaerieUssServiceProvider.GenHtmlTemplateFromSJson('signup','Y',"REGISTER|BACK") + "</div> </center>"
               ,controller :  'signupController'
              }

             
            }
        });

    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get('$state');

        $state.go('login', {
            title: "Page not found",
            message: 'Could not find a state associated with url "'+$location.$$url+'"'
        });
    });
        


      

 
    //$httpProvider.defaults.headers.post['XSRF-AUTH'] = "some accessToken to be generated later"; 

        console.log('httpProvider');
        console.log($httpProvider);
      // $httpProvider.defaults.headers.post['x-access-token'] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIZWFlcmllIEdTTCIsImF1ZCI6Ind3dy5teXJvb21leHBlbnNlLmNvbSIsImlhdCI6IjYwbXMiLCJleHAiOjE0NDg2ODYwNTR9.-JiMA_sU22ZVbBSxuxTnyQY6khghSjGy7hdmNk11Ysk";
        $httpProvider.interceptors.push(['$q', '$injector','toaster','$window'//,'uss' 
                                ,function($q, $injector,toaster,$window//,uss
                                  ){  
    var sessionRecoverer = {
        responseError: function(response) {
            // Session has expired

               console.log(response);
            if (response.status == 302){

                $window.sessionStorage.clear();
                //var SessionService = $injector.get('SessionService');
                var $http = $injector.get('$http');
                var deferred = $q.defer();
                toaster.pop('error','this', 'session is expired');

             //   uss.Test('Test');
                // Create a new session (recover the session)
                // We use login method that logs the user in using the current credentials and
                // returns a promise
                //SessionService.login().then(deferred.resolve, deferred.reject);

                // When the session recovered, make the same backend call again and chain the request

                $injector.get('$state').go('login');

                return deferred.promise.then(function() {
                    return $http(response.config);
                });
            }
            else if (response.status == 304){

                $window.sessionStorage.clear();
                //var SessionService = $injector.get('SessionService');
                var $http = $injector.get('$http');
                var deferred = $q.defer();
                toaster.pop('error','Error:', 'Invalid User Id / Password');

             //   uss.Test('Test');
                // Create a new session (recover the session)
                // We use login method that logs the user in using the current credentials and
                // returns a promise
                //SessionService.login().then(deferred.resolve, deferred.reject);

                // When the session recovered, make the same backend call again and chain the request

                $injector.get('$state').go('login');

                return deferred.promise.then(function() {
                    return $http(response.config);
                });
            }
            else if(response.status == 404)
            {
                toaster.pop('error','404', 'Request services is not avaliable for You');
                $injector.get('$state').go('login');
            }
            return $q.reject(response);
        }
        ,response: function(response) {
            var deferred = $q.defer();

             // console.log('response');
              //console.log(response);

            

              var respJSON=JSON.stringify(response);

              // alert("success["+ respJSON + "]" );
              
                //toaster.pop('success','200', 'Success response [' + response.headers('x-access-token') +"]");

                   var accessToken= response.headers('x-access-token');

                  // alert('accessToken:' + accessToken);
                   if (angular.isDefined(accessToken))
                   {
                      if( accessToken != null)
                      {
                        $window.sessionStorage.accessToken=accessToken;
                      }
                  }
                return response;

            }
            ,request: function(request) {
           
                   console.log('request');
              console.log(request);

                //toaster.pop('success','Request', 'Send response session [' +$window.sessionStorage.accessToken +"]");


               request.headers['x-access-token'] = $window.sessionStorage.accessToken || '';
          
            return request;
        }
    };
    return sessionRecoverer;
}]);




        }]);

webApp.provider('$dashboardState', function($stateProvider,heaerieUssServiceProvider){
        this.$get = function($state){
            return {
                /**
                 * @function app.dashboard.dashboardStateProvider.addState
                 * @memberof app.dashboard
                 * @param {string} title - the title used to build state, url & find template
                 * @param {string} controllerAs - the controller to be used, if false, we don't add a controller (ie. 'UserController as user')
                 * @param {string} templatePrefix - either 'content', 'presentation' or null
                 * @author Alex Boisselle
                 * @description adds states to the dashboards state provider dynamically
                 * @returns {object} user - token and id of user
                 */
                addState: function(title, controllerAs, templatePrefix) {

                   /* $stateProvider.state('dashboard.' + title, {
                        url: '/' + title,
                        views: {
                            'dashboardModule@dashboard': {
                                templateUrl: PATHS.DASHBOARD + (templatePrefix ? templatePrefix + '/' : '/') + title + '/' + title + '.view.html',
                                controller: controllerAs ? controllerAs : null
                            }
                        }
                    });
*/

           // alert('dynamic State Add');
              $stateProvider.state('basicDetUSSNavi', 
        {
            url         : '/basicDetUSSNavi'
           ,views:{

             'pageMainContext' :
              {                
               
                //template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('N')
               templateUrl : 'js/lib/views/naviView.html'
              }
              ,

              'pageSubContext@basicDetUSSNavi' :
              {                
               
                template : heaerieUssServiceProvider.GenHtmlTemplateFromSJson('basicDet','Y','SAVE')
                //template : '<form name="myForm" > <label for="exampleInput">Pick a date in 2013:</label> <input type="date" id="exampleInput" name="input" ng-model="example.value"placeholder="yyyy-MM-dd" min="2013-01-01" max="2016-12-31" required /> <div role="alert"> <span class="error" ng-show="myForm.input.$error.required"> Required!</span> <span class="error" ng-show="myForm.input.$error.date"> Not a valid date!</span> </div> <tt>value = {{example.value | date: "yyyy-MM-dd"}}</tt><br/> <tt>myForm.input.$valid = {{myForm.input.$valid}}</tt><br/> <tt>myForm.input.$error = {{myForm.input.$error}}</tt><br/> <tt>myForm.$valid = {{myForm.$valid}}</tt><br/> <tt>myForm.$error.required = {{!!myForm.$error.required}}</tt><br/> </form>'//heaerieUssServiceProvider.GenHtmlTemplateFromSJson('Y','SAVE') ,controller :  'basicDetController'
                ,controller :  'basicDetController'//template : 'this is test'
               // templateUrl : 'view/loginView.html'
              }
            }
        });



                }
            }
        }
    });

webApp.run(['$rootScope','$q', '$injector' , '$window', function($rootScope,$q, $injector ,$window) {

    //$rootScope.$state = $state;
    $rootScope.goUrl= function(stateToGo)
    {

      //alert('I am in stateToGo' );
      //console.log(angular.toJson($state.get()));
       // console.log($injector.get('$state').get());

      if(stateToGo == 'registerUSSBack')
      {

         $injector.get('$state').go('login');
      }
      else if(stateToGo == 'logout')
      {

          $window.sessionStorage.clear();
         $injector.get('$state').go('login');
      }
     else
      {
         $injector.get('$state').go(stateToGo);
      }


         
    }
}]);


/*


   */

/*


    webApp.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  alert('alert config');
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

*/


    return webApp;
});
