var mosca = require("mosca");

var dbSettings = {
    type: 'mongo',                         //it can be mongo / redis
    url: 'mongodb://localhost:27017/mqtt', //default is localhost:27017,mqtt is the db name
    pubsubCollection: 'mosca',             //default collection name is pubsub.
    mongo: {}                              //if any mongo specific options needed.
  }


  var serverSettings = {
    port: 1883,                             //default port is 1883 for mqtt
    backend: dbSettings                     //database sttings we have created earlier
  }


  secure : {
    port: 8884                             //provide secure port if any (default 8883 ssl) 
    keyPath: {your keypath},               //path of .pem file
    certPath: {your certpath}              //path of .pem file
    }

    /*
   - this option will create a http server with mqtt attached. 
     - `port`   (optional)   the http port to listen. default 3000
     - `bundle` (optional)   if set to true then mqtt.js file will be served,so 
                             no need to download it.default is false.
     - `static` (optional)   provide your static files path.
    ** to access the mqtt.js or your static files put {yourhost}:{port}/staticfilename
   */
http: {
    port: 3000,
    bundle: true,
    static: './public'
    }

    credentials: {
        keyPath: {your keypath},              //path of .pem file
        certPath: {your certpath}             //path of .pem file
      },
      https:{
        port : 3030,                          //(optional default 3001)
        bundle : true,
        static : ‘/’, 
      }
    
      
      /*
         - this option will create a session over subscription and packets
           - `factory`       the persistence factory you want to choose from Mongo,Redis,LevelUp,Memory
           - `url`           the url of your persistence db
           - `ttl`(optional) the expiration of session
              - `subscriptions`  time period for subscriptions in ms (default 1 hour)
              - `packets`        time period for packets ini ms (default 1 hour)
           - `mongo`         the mongo specific options if any otherwise null object
           ** this module is specially used for retain messages
      */
      persistence: {
        factory: mosca.persistence.Mongo,
        url: 'mongodb://localhost:27017/mqtt',
        ttl: {
          subscriptions: 60 * 60 * 1000,
          packets: 60 * 60 * 1000,
        },
        mongo: {}                           //mongo specific options
      }
     ////Status to get the status (subscribed clients , packages etc.) of the server on every 10s set status property to true.
      
      stats: true,                        //(optional)  default false 
      //Create server
      
      var server = new mosca.Server(serverSettings);
      //Mosca events
      
      //on client connected
      server.on('clientConnected', function(client) {
        console.log("new client Connected");
      });
      //on client disconnecting
      server.on('clientDisconnecting',function(client){
       console.log("client is disconnectting");
      });
      //on client disconnected
      server.on('clientDisconnected',function(client) {
        console.log("client is disconnected");
      });
      //on any server error
      server.on('error',function(err){
          console.log("error from server : ", err)
      });
      //on new client subscribtion to a topic
      server.on('subscribed',function(topic,client){
          console.log("new client subscribed to --> ",topic);
      });
      //on unsubscribtion from a topic
      server.on('unsubscribed',function(topic,client){
          console.log("client unsubscribed to --> ",topic);
      });
      //on any new message published
      server.on('published', function(packet, client) {
        console.log("published packet : ", packet, "\n");
        //console.log("published client : ", client, "\n");
        console.log("Message received from package : \n", packet.payload.toString("utf-8"));
      });
      //on server ready
      server.on('ready', setup);
      
      function setup() {
        console.log('Mosca server running');
        //  console.log(server);
      }
      
    { 
  topic: 'topic/child',
  payload: <Buffer 7b 22 6e 61 6d 65 22 3a 22 73 61 69 6b 61 74 22 2c 22 74 69 74 6c 65 22 3a 22 68 61 6a 72 61 22 7d>,
  messageId: '4JftrH60W-',
  qos: 0,
  retain: false
}