// const db = require('../db');
const Product = require('../models/product-model');

module.exports.showProduct = async (req, res)=>{
    var products = await Product().find();
    var numberPro = product.length;
    var page = parseInt(req.query.page) || 1;
    var perPage = 12;
    var pos =0;
    var start = (page - 1)*perPage;
    var end = page*perPage;

    if(end>=numberPro){
        pos=2;
    }else if(end === perPage){
        pos=0;
    }else{
        pos=1;
    }
    // var sessionId = req.signedCookies.sessionId;
    // var cart = db.get('sessions')
    //     .find({ id: sessionId })
    //     .get('cart')
    //     .value();
    // var totalProducts = 0;
    // if(cart){
    //     for (let [key, value] of Object.entries(cart)) {
    //         totalProducts += value;
    //     }
    // }

    res.render('products/listProduct',{
        products: products.slice(start, end),
        page: page,
        pos: pos,
        numberCart: totalProducts
    });
};

// module.exports.searchProduct = (req,res)=>{
//     var q = req.query.q;
//     var matchedUsers = db.get('users').value().filter(function(user){
//         return user.name.indexOf(q) >= 0;
//     });
//     res.render('users/index', {
//         users: matchedUsers
//     });
// };