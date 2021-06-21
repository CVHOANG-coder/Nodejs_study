const db = require('../db');
const nanoid = require('nanoid');
module.exports = (req, res, next)=>{
    if(!req.signedCookies.sessionId){
        var sessionId = nanoid.nanoid();
        res.cookie('sessionId', sessionId,{
            signed: true
        });
        db.get('sessions').push({
            id: sessionId
        }).write();
    }
    next();
}