const tmi = require('tmi.js');
const { OAUTHPASSWORD } = require('./secrets');

// Define configuration options
const opts = {
  identity: {
    username: 'yunggarlicbot',
    password: OAUTHPASSWORD,
  },
  channels: ['yung_garlic'],
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();
  if (commandName.slice(0, 1) === '!') {
    switch (commandName) {
      case '!dice':
        const num = rollDice();
        client.say(target, `${context['display-name']} rolled a ${num}`);
        console.log(`* Executed ${commandName} command`);
        break;
      case '!lurk':
        client.say(
          target,
          `${context['display-name']} entered the chill zone.`
        );
        break;
      default:
        console.log(context['display-name']);
        console.log(`* Unknown command ${commandName}`);
    }
  }
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Success! Connected to ${addr}:${port}`);
}
