 
# Covid Update - Twilio Hackathon Submission

## About

This application is a submission for the Twilio Hackathon on DEV.  Covid News leverages the twilio api to send out daily SMS messages to the individuals that have subscribed.  Included in the text message would be state statistics for total case, positive and negative counts, and number of deaths.  Along with the state statistics will be the latest 5 national news headlines to jumpstart the morning.

### How it works

This application is a barebones Node.js application using Express.js, Mongoose.js and Pug Templating for webpages.  A cron job is setup to run at 8:00AM to get all the users in a MongoDb collection.  It gathers the news and the stats based on the state from 2 different APIs then sends a text message to the user.


## Features

- Node.js web server using [Express.js](https://npm.im/express)
- Basic web user interface using [Pug](https://npm.im/pug) for templating and Bootstrap for UI
- User interface to allow users to subscribe to the SMS message list
- Project specific environment variables using `.env` file

## How to use it

1. Once the server is started, navigate to [localhost:3000](http://localhost:3000)
2. Input your phone number and state into the web form
3. Text message should be received at 8:00am with the updated stats and news
4. To unsubscribe, reply to the text message.

## Set up

### Requirements

- [Node.js](https://nodejs.org/)
- [MongoDb](https://mongodb.com) instance
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)

### Twilio Account Settings

Before we begin, we need to collect all the config values we need to run the application:

| Config&nbsp;Value | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account&nbsp;Sid  | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console).                                                         |
| Auth&nbsp;Token   | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console).                                                         |
| Phone&nbsp;number | A Twilio phone number in [E.164 format](https://en.wikipedia.org/wiki/E.164) - you can [get one here](https://www.twilio.com/console/phone-numbers/incoming) |

We also need to setup a webhook within Twilio to handle replies to texts so that it allows the users to unsubscribe from the SMS list through text.  The webhook will need to be directed to /user/unsubscribe.

- Follow the "Configure Your Webhook URL" section: [Webhooks](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-node-js)

### Local development

After the above requirements have been met:

1. Clone this repository and `cd` into it

```bash
git clone https://github.com/RozzaysRed/covid-news.git
cd covid-news
```

2. Install dependencies

```bash
npm install
```

3. Set your environment variables

Create .env file at the project's root directory and add the following variables.
 Variable&nbsp;Name | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TWILIO_ACCOUNT_SID  | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console).                                                         |
| TWILIO_AUTH_TOKEN   | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console).                                                         |
| TWILIO_PHONE_NUM | A Twilio phone number in [E.164 format](https://en.wikipedia.org/wiki/E.164) - you can [get one here](https://www.twilio.com/console/phone-numbers/incoming) |
| MONGODB_CONN_STRING | Connection to your MongoDb instance


See [Twilio Account Settings](#twilio-account-settings) to locate the necessary environment variables.

4. Run the application

```bash
npm start
```

Alternatively, you can use this command to start the server in development mode. It will reload whenever you change any files.

```bash
npm run watch:start
```

5. Navigate to [http://localhost:3000](http://localhost:3000)

That's it!
                                                          |

## Resources

- [Twilio API](https://www.twilio.com/docs/usage/api)
- [DEV Hackathon](https://dev.to/devteam/announcing-the-twilio-hackathon-on-dev-2lh8)
- [Covid Tracking](https://covidtracking.com)
## Contributing

This project is open source and welcomes contributions. 
<!-- All contributions are subject to our [Code of Conduct](https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md). -->

[Visit the project on GitHub](https://github.com/twilio-labs/sample-template-nodejs)

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.

[twilio]: https://www.twilio.com
