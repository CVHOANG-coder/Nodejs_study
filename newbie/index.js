require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const mongoose = require('mongoose')

mongoose.connect(Process.env.MONGO_URL);

//model trong pakage
const userRoutes= require('./routes/user-routes');
const authRoutes= require('./routes/auth-routes');
const productRoutes= require('./routes/product-routes');
const cartRoutes= require('./routes/cart-routes');
const transferRoutes= require('./routes/transfer-routes');

const authMiddlewares = require('./middlewares/auth-middlewares');
const sessionMiddlewares = require('./middlewares/session-middleware');


const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));
app.use(sessionMiddlewares);


app.get('/', function(request, response){
    response.render('index',{
        name: 'EveryBody'
    });
});

app.use('/users', authMiddlewares.requireAuth, userRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/transfer',authMiddlewares.requireAuth, transferRoutes);
app.use('/auth', authRoutes);
app.use(csurf({cookie: true}));
app.listen(port, function(){
    console.log('Server listening on port' + port);
});
