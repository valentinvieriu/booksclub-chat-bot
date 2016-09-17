var mqtt    = require('mqtt');
var request = require('request');
// var client  = mqtt.connect('mqtt://mqtt.booksclub.space');
 
var client  = mqtt.connect('mqtt://163.172.188.98');

client.on('connect', function () {
  client.subscribe('book/#');
  console.log('Bot Started!');
});
client.on('message', function (topic, message) {
  var response = JSON.parse(message.toString());
  if (response.type == 'chat' && response.username !== 'ShakespeareBot') {
    request.post({
      url:'http://api.program-o.com/v2/chatbot/', 
      form: {
        bot_id:10,
        convo_id:response.username,
        format:'json',
        say:response.message
      }
    }, function(err,httpResponse,body){ 
      if(!err){
        var botResponse = JSON.parse(body);
        console.log('\n\nQ:',response.message);
        console.log('A:',botResponse.botsay);
        client.publish(topic, JSON.stringify(
          {
            username:'ShakespeareBot',
            type:'chat',
            message:botResponse.botsay
          }
          ));

      }
    })
  }
  // console.log(message.toString());
});

// client.end();