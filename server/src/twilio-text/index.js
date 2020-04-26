import twilio from 'twilio';

import models from '../models';
import { getNationalNews, getCovidStats} from './news';

require('dotenv').config();

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;


const client = require('twilio')(twilioAccountSid, twilioAuthToken);

const sendTextToUsers = async() => {
    // Get all user phone numbers
    let getUsersPromise = getAllUsers();
    let users = [];

    await getUsersPromise.then((usersObj) => {
        users = usersObj.map((userObj) => {
            return userObj;
        })
    });

    users.forEach(async (user) => {
        let stateAbbrv = user.stateAbbrv;
        let message = "";
        // message += "\n" + getNationalNews();
        await getCovidStats(stateAbbrv).then((data) => {
            message += `State: ${stateAbbrv}\nTotal Cases: ${data["total"]}\n` + 
                        `Positive: ${data["positive"]}\nNegative: ${data["negative"]}\n` + 
                        `Deaths: ${data["death"]}`
        })
        .catch((error) => console.log(error))

        message += '\n\nNational News:\n';

        await getNationalNews().then((data) => {
            for(let i = 0; i < 5; i++)
            {
                message += `* ${data[i].url}\n\n`;
            }
        })
        .catch((error) => console.log(error));

        sendMessage(user.phoneNumber, message);
    });
}

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        models.User.find({}, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    })
}
const sendMessage = (toPhoneNumber, message) => {
    client.messages
        .create({
            body: message, 
            from: process.env.TWILIO_PHONE_NUM, 
            to: toPhoneNumber
        })
        .then(message => { })
        .catch((err) => console.log(err));
}

export default sendTextToUsers;