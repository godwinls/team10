
/**
 * Module dependencies.
 */

var express = require('express')
  , session = require('express-session')
  , routes = require('./routes')
  //, user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , home = require('./routes/home')
  , admin = require('./routes/admin');

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
app.get('/signUp', home.signUp);
app.post('/afterSignUp', home.afterSignUp);
app.get('/signIn', home.signIn);
app.get('/afterSignIn', home.afterSignIn);
app.get('/signIn_admin', admin.signIn_admin);
app.get('/afterSignIn_admin', admin.afterSignIn_admin);
app.get('/signOut_admin', admin.signOut_admin);
app.get('/listPerson', admin.listPerson);
app.get('/toAdminHome', admin.toAdminHome);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
