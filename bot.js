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
      case '!lurk':
        client.say(
          target,
          `${context['display-name']} entered the chill zone.`
        );
      default:
        console.log(context['display-name']);
        console.log(`Message event: ${commandName}`);
        console.log(`target --> ${target}`);
    }
  }
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

//Timed Messages
// 30 minutes
setTimeout(enjoyingStream, 1800000);
setTimeout(lurkReminder, 2100000);

function enjoyingStream() {
  client.say(
    target,
    `Enjoying the stream? Be sure to SMASH that follow button.`
  );
}

function lurkReminder() {
  client.say(
    target,
    `Want to support the stream but need to mute and minimize? Type !lurk into the chat to make sure your view goes to our precious, precious view count. Big numbers baby, big numbers.`
  );
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Success! Connected to ${addr}:${port}`);
}
