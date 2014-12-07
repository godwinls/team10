
/**
 * Module dependencies.
 */

var express = require('express')
  , session = require('express-session')
  , routes = require('./routes')
  //, user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var home = require('./routes/home')
  , admin = require('./routes/admin')
  , signIn = require('./routes/signIn')
  , signUp = require('./routes/signUp')
  , index = require('./routes/index')
  , user = require('./routes/user')
  , activate = require('./routes/activate')
  , category = require('./routes/category')
  , edit = require('./routes/edit')
  , edit1 = require('./routes/edit1')
  , shoppingcart = require('./routes/shoppingcart')
  , product = require('./routes/product');

var app = express();

app.use(session({secret: 'keyboard cat'}));
app.use(function(req, res, next){ 
	res.locals.session = req.session; 
	next(); 
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);
app.get('/signUp', signUp.signUp);
app.post('/afterSignUp', signUp.afterSignUp);
app.get('/signIn', signIn.signIn);
app.get('/afterSignIn', signIn.afterSignIn);
app.get('/signIn_admin', admin.signIn_admin);
app.get('/afterSignIn_admin', admin.afterSignIn_admin);
app.get('/signOut_admin', admin.signOut_admin);
app.get('/listPerson', admin.listPerson);
app.get('/listCustomers', admin.listCustomers);
app.get('/listSellers', admin.listSellers);
app.get('/toAdminHome', admin.toAdminHome);
app.post('/toDeleteC', admin.toDeleteC);
app.post('/deactivateC/:cid', admin.deactivateC);
app.post('/toDeleteS', admin.toDeleteS);
app.post('/deactivateS/:sid', admin.deactivateS);
app.post('/toDeleteP', admin.toDeleteP);
app.post('/deleteP/:pid', admin.deleteP);
app.get('/myAccount', user.showUser);
app.get('/buyHistory', user.showBuyHistory);
app.get('/sellHistory', user.showSellHistory);
app.get('/list/:cid', signIn.list);
app.post('/bdeactivate', activate.bdeactivate);
app.post('/bactivate', activate.bactivate);
app.post('/sdeactivate', activate.sdeactivate);
app.post('/sactivate', activate.sactivate);
app.get('/signOut', index.signOut);
app.get('/toHomepage', signIn.toHomepage);
app.get('/toEditEmail', edit.toEditEmail);
app.post('/editEmail', edit.editEmail);
app.get('/toshoppingcart', shoppingcart.toshoppingcart);
app.post('/checkout', shoppingcart.checkout);
app.get('/payment', shoppingcart.payment);
app.get('/productDetail/:proid', product.productDetail);

app.get('/toEditPassword', edit1.toEditPassword);
app.post('/editPassword', edit1.editPassword);
app.get('/toEditNameAddress', edit1.toEditNameAddress);
app.post('/editNameAddress', edit1.editNameAddress);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
