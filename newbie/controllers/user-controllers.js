const db = require('../db');
const nanoid = require('nanoid');

module.exports.index = (req, res)=>{
    res.render('users/index',{
        users: db.get('users').value()
    });
};

module.exports.search = (req,res)=>{
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user){
        return user.name.indexOf(q) >= 0;
    });
    res.render('users/index', {
        users: matchedUsers
    });
};

module.exports.create = (req,res)=>{
    res.render('users/create');
};

module.exports.getViewUser = (req,res)=>{
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    res.render('users/view',{
        user: user
    });
};

module.exports.postCreate = (req, res)=>{
    req.body.id = nanoid.nanoid();
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');

    db.get('users').push(req.body).write();
    res.redirect('/users');

};

module.exports.delUser = (req, res)=>{
    var id = req.body.delId;
    db.get('users').remove({id : id}).write();
    res.redirect('/users');
};