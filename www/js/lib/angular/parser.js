

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
          tagByte.push(intToHexChar(highByte));
          tagByte.push(intToHexChar(lowByte));
       // nextSubsequent=1;
          tagLen++;
        }
        else if (modeCnt ==1)
        {
           len.push(intToHexChar(highByte));
           len.push(intToHexChar(lowByte));
           lenByte.push(highByte<<4|lowByte);
           lengthSize--;
           tagLen++;
        }
        else if (modeCnt >= 2)
        {
           data.push(intToHexChar(highByte));
           data.push(intToHexChar(lowByte));

          // ascii.push(String.fromCharCode(inpBytes[i])) ;
           dataByte.push(inpBytes[i]);
           tagLen++;
        }
    }

    if (modeCnt ==0 && nextSubsequent ==0 && leadingOctet ==0)
        {
          tagByte.push(intToHexChar(highByte));
          tagByte.push(intToHexChar(lowByte));
       // nextSubsequent=1;
          tagLen++;
        }

     if(( modeCnt == 1 && nextSubsequent == 0 ) && (leadingOctet !=1))
     {
          len.push(intToHexChar(highByte));
           len.push(intToHexChar(lowByte));
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
     var lenVal       =$scope.getLengthVal(lenByte);
     var dataHex       =  $scope.hexArrToString(data);
      var remData     = dataHex.substr(lenVal*2); 
      var value       = dataHex.substr(0,lenVal*2); 
      var valueByte   =$scope.ByteSubstr2(dataByte,0,lenVal);
      var remDataByte =$scope.ByteSubstr1(dataByte,lenVal);
      var tag         =$scope.hexArrToString(tagByte);
          ascii=$scope.bytesToAscii(valueByte) ;
     parentObj={    'class'             : classVal 
                    ,'primitiveOrConst' : primitiveOrConst
                    //,'tagByte'          : tagByte
                    ,'tag'              : tag
                     ,'lenVal'              : lenVal
                    ,'tagDescr'         :  $scope.getTagDescr(tag)
                    
                   // ,'len'              : len
                   // ,'lengthSize'              : lengthSize
                  //  ,'lenByte'          : lenByte 
                    ,'lenVal'           : lenVal
                   // ,'data'             : dataHex
                    //,'dataByte'         : dataByte
                  //  ,'remData'          : remData
                    ,'value'            : value
                    ,'ASCII'            : ascii //$scope.hexArrToString($scope.hexToBytes(dataHex))
                    //, 'valueByte'       : valueByte
                   // , 'remDataByte'     : remDataByte
                    ,'childs' : []
               };


  

  if(primitiveOrConst == 1)
  {
    //var childJson = 
      parentObj.childs=parseTVL(valueByte);
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
    var childJsonS = parseTVL(remDataByte);
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

    // rtStr.push(String.fromCharCode($scope.hexToByte(inpStrArr[i]) <<4| $scope.hexToByte(inpStrArr[i+1])));
     bytes[j++]=$scope.hexToByte(inpStrArr[i]) <<4| $scope.hexToByte(inpStrArr[i+1]);
  }

  return bytes;
}

this.doTvl=function(val)
{
  var retVal=val;
  var inpStrArr=$scope.stringToByteArray(val);

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