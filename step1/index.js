// Restify library to create a webserver hosting the bot REST service
const restify = require('restify');

// Bot framework adapter
const { BotFrameworkAdapter } = require('botbuilder');

// Bot Step 1 module
const { Bot_step1 } = require('./bot');

// Listening port of the server hosting the bot - hard configuration for this step
const port = 3978;

// Creation of the server hosting the bot
const server = restify.createServer({ name: 'WeatherBot Server step1' });
server.listen(port, () => {
  console.log(`${server.name} listening on ${server.url}`);
  console.log(`\nGet emulator on: https://aka.ms/botframework-emulator`);
});

// Creating the server host the bot
const adapter = new BotFrameworkAdapter();

// Error response function
adapter.onTurnError = async (context, error) => {
  // error log
  console.error(`\n[onTurnError]: ${error}`);
  // warn the user on the exchange channel
  await context.sendActivity('Sorry, but a technical problem has ocurred');
};

// Creating the bot
const bot = new Bot_step1();

// Starting the server listening on /api/messages
server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    // route the message encapsulated in the turnContext to the bot
    await bot.onTurn(context);
  });
});
