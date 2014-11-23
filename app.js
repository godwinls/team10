/**
 * Module dependencies.
 */

var express = require('express')
  , session = require('express-session')
  , routes = require('./routes')
  , http = require('http')
<<<<<<< HEAD
  , path = require('path')
  , home = require('./routes/home');
=======
  , path = require('path');
//add by me
var session= require('express-session')
  , flash = require('connect-flash');
>>>>>>> branch 'master' of https://github.com/godwinls/team10.git

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
//add by me
app.use(flash());
app.use(express.cookieParser());
app.use(session({
  secret: 'ebay',
  cookie: {maxAge: 86400000},
  saveUninitialized: true,
  resave: true
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

<<<<<<< HEAD
//app.get('/', routes.index);
//app.get('/users', user.list);
app.get('/signUp', home.signUp);
app.post('/afterSignUp', home.afterSignUp);
app.get('/signIn', home.signIn);
app.get('/afterSignIn', home.afterSignIn);

=======
routes(app);
>>>>>>> branch 'master' of https://github.com/godwinls/team10.git

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
