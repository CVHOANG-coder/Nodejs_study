const db = require('../db');
const nanoid = require('nanoid');

module.exports.createTransfer = (req, res, next)=>{
    res.render('transfer/create',{
        csrfToken: req.csrfToken()
    });
};

module.exports.postTransfer = (req, res, next)=>{
    var data = {
        id: nanoid.nanoid(),
        amount: parseInt(req.body.amount),
        accountId: req.body.accountId,
        userId: req.signedCookies.userId
    }
    db.get('transfers').push(data).write();
    res.redirect('/transfer/create');
};