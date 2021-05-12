var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');
var options = {
    port:5000,
    host: HOST,
    keyPath: KEY,
    certPath: CERT,
    rejectUnauthorized : true, 
    //The CA list will be used to determine if server is authorized
    ca: TRUSTED_CA_LIST
  }
  
  var options = {
    keepalive: 10,
    clientId: client_Id,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,                  //set to false to receive QoS 1 and 2 messages while offline
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {                       //in case of any abnormal client close this message will be fired
        topic: 'ErrorMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
    },
    username: 'demo',
    password: 'demo',
    rejectUnauthorized: false,
}
var client = mqtt.connect(host,options);
client.subscribe('topic/client', { qos: 1 }, function(err, granted) {
    if (err)
      console.log(err);
    else
      console.log("client connected : ", granted);
  });


  //set retain true to deliver a message (like welcome messages) to the newly subscribed client.
//set qos = 1 to guarantee delivery service implement. 
//broker will always store the last retain message per topic if retain is true for messages.
client.publish('topic/client', JSON.stringify({ name: "saikat", title: "hajra" }), { retain: true, qos: 1 },function(){
    console.log("message published");
  });

  /*** client on connect ***/
client.on("connect", function() {
    console.log("cleint is connected");
  })
  
  /*** client on reconnect ***/
  client.on("reconnect", function() {
    console.log("cleint is reconnected");
  })
  
  /*** client on error ***/
  client.on("error", function(err) {
    console.log("error from client --> ", err);
  })
  
  /*** client on close ***/
  client.on("close", function() {
      console.log("cleint is closed");
  })
    
    /*** client on offline ***/
  client.on("offline", function(err) {
    console.log("client is offline");
  });
  client.on('message', function(topic, message) {
    console.log(message.toString());                  // message is Buffer
  });
