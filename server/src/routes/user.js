import { Router } from 'express';
import models from '../models'
var router = Router();

router.post('/', (req, res, next) => {
    let phoneNumber = req.body.phoneNumber;
    let state = req.body.stateAbbrev;

    if(checkValidPhoneNumber(phoneNumber))
        phoneNumber = updateCountryCode(phoneNumber);
    else
        phoneNumber = '';

    let ok = insertUser(phoneNumber, state);

    if (!ok)
        res.render('subError');
    else
        res.render('thankyou');
});

router.post('/unsubscribe', (req, res, next) => {
    // No need to add country code as Twilio will already add it
    let phoneNumber = req.body.phoneNumber;
    console.log(phoneNumber);
    models.User.deleteOne({
               phoneNumber: phoneNumber 
            }, (err, deletedUser) => {
                res.json(deletedUser);
            });
});

const insertUser = (phoneNumber, usStateAbbrv) => {
    // let user = new models.User({
    //     phoneNumber: phoneNumber,
    //     stateAbbrv: usStateAbbrv,
    // });

    if(phoneNumber == '' || phoneNumber == ' ' || usStateAbbrv == '' || usStateAbbrv == ' ')
    {
        return false;
    }
    
    models.User.findOneAndUpdate({phoneNumber: phoneNumber}, 
                                {stateAbbrv: usStateAbbrv}, 
                                { new: true, upsert: true , useFindAndModify: false})
                                .then((doc) => {
                                    return true;
                                });
    return true;
}

const updateCountryCode = (phoneNumber) => {
    let updatedNumber = "+1" + phoneNumber;
    
    return updatedNumber;
}

const checkValidPhoneNumber = (phoneNumber) => {
    var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(phoneNumber.match(regex))
    {
        return true;
    }
    else
    {
        return false;
    }
}

export default router;