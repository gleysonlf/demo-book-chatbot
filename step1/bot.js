// Enumeration of the types of activities
const { ActivityTypes } = require('botbuilder');

class Bot_step1 {
  // Processing message received from the channel (provided by adapter)
  async onTurn(turnContext) {
    // Depending on the type of message, different processing is done
    switch (turnContext.activity.type) {
      case ActivityTypes.Message:
        {
          // get the message text
          const text = turnContext.activity.text.toLowerCase();
          // depending on the utterrance
          switch (text) {
            case 'hello':
              await turnContext.sendActivity(
                "Hi, I'm a future weather chatbot who just knows how to say hello and sau goodby for the moment."
              );
              break;
            case 'bye':
              await turnContext.sendActivity('Bye!');
              break;
            default:
              await turnContext.sendActivity(
                'Sorry, but i have no knowledge on this subject. I can only greet and say goodbye'
              );
              break;
          }
        }
        break;

      case ActivityTypes.ConversationUpdate:
        {
          // Present the bot on its arrival channel event
          const addedMembers = turnContext.activity.membersAdded;
          if (addedMembers[0].name == 'Bot') {
            await turnContext.sendActivity(
              'WeatherBot step 1 join you - ready to answer you'
            );
          }
        }
        break;

      default:
        {
          // For any other activity type, a message is returned indicating its detection.
          await turnContext.sendActivity(
            `[${turnContext.activity.type} detected and not processed by the bot]`
          );
        }
        break;
    }
  }
}

module.exports.Bot_step1 = Bot_step1;
