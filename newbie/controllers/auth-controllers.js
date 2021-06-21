const db = require('../db');
const md5 = require('md5');
module.exports.login = (req, res)=>{
    res.render('auth/login');
};

module.exports.postLogin = (req, res)=>{
    var email = req.body.email;
    var pass = req.body.password;
    var user = db.get('users').find({email: email}).value();
    if(!user){
        res.render('auth/login',{
            errors:[
                'User does not exist'
            ],
            values: req.body
        });
        return;
    }
    if(user.password!== md5(pass)){
        res.render('auth/login',{
            errors:[
                'Wrong password'
            ],
            values: req.body
        });
        return;
    }

    res.cookie('userId',user.id,{
        signed: true
    })
    res.redirect('/users');
};