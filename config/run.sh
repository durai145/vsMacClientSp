#curl -v -X POST -H "Content-Type: application/json"  http://localhost:5000/service/iot/postVibration --data @test.json
#curl -v -X POST -H "Content-Type: application/json"  http://localhost:5000/service/iot/postVibration --data  @postVibration.json
#curl -v -X POST -H "Content-Type: application/json"  http://localhost:5000/service/iot/postVibration 
curl -v  -X POST -H "Content-Type: application/x-www-form-urlencoded"  http://myroomexpense.com:5000/service/iot/postVibration --data "grantType=password&clientId=CLIENTSP&scope=GPA&iotRequest=[{\"iotRequest\":[{\"appTest\":[{\"value\":\"3\"}] }  ]}];"

