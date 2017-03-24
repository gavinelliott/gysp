var path = require('path'),
    express = require('express'),
    favicon = require('serve-favicon'),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    basicAuth = require('basic-auth-connect'),
    port = (process.env.PORT || 3000),

// Grab environment variables specified in Procfile or as Heroku config vars
    sessionKey = process.env.sessionKey || "lion",
    sessionTimeOut = process.env.sessionTimeOut || 3000000,
    username = process.env.USERNAME,
    password = process.env.PASSWORD,
    env = process.env.NODE_ENV || 'development';

// Authenticate against the environment-provided credentials, if running
// the app in production (Heroku, effectively)
if (env === 'production') {
  if (!username || !password) {
    console.log('Username or password is not set, exiting.');
    process.exit(1);
  }
  app.use(basicAuth(username, password));
}

app.use(session({ secret: sessionKey, cookie: { maxAge: sessionTimeOut }, resave: true, saveUninitialized: true}));

// Application settings
app.engine('html', require(__dirname + '/lib/template-engine.js').__express);
app.set('view engine', 'html');
app.set('vendorViews', __dirname + '/govuk_modules/govuk_template/views/layouts');
app.set('views', __dirname + '/app/views');

// Middleware to serve static assets
app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_template/assets'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit'));
app.use('/public/images/icons', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit/images'));
// Elements refers to icon folder instead of images folder

app.use(favicon(path.join(__dirname, 'govuk_modules', 'govuk_template', 'assets', 'images','favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// send assetPath to all views
app.use(function (req, res, next) {
  res.locals.assetPath="/public/";
  next();
});

// routes (found in app/routes.js)
app.use("/", require('./app/routes.js'));
app.use("/", require('./app/routes/generic.js'));
app.use("/beta", require('./app/routes/beta.js'));
app.use("/d1build", require('./app/routes/d1build.js'));
app.use("/demo", require('./app/routes/demo.js'));
app.use("/iteration1-v4", require('./app/routes/iteration1-v4.js'));
app.use("/iteration2-v2", require('./app/routes/iteration2-v2.js'));
app.use("/iteration2-v4", require('./app/routes/iteration2-v2.js'));
app.use("/iteration3-v1", require('./app/routes/iteration3-v1.js'));
app.use("/iteration3-v2", require('./app/routes/iteration3-v2.js'));
app.use("/iteration1", require('./app/routes/iteration1.js'));
app.use("/january", require('./app/routes/january.js'));
app.use("/ovsea-test", require('./app/routes/ovsea-test.js'));
app.use("/sprint3", require('./app/routes/sprint3.js'));
app.use("/sprint4", require('./app/routes/sprint4.js'));
app.use("/sprint5", require('./app/routes/sprint5.js'));
app.use("/sprint6", require('./app/routes/sprint6.js'));
app.use("/sprint7", require('./app/routes/sprint7.js'));
app.use("/sprint8", require('./app/routes/sprint8.js'));
app.use("/sprint8v2", require('./app/routes/sprint8v2.js'));
app.use("/sprint9", require('./app/routes/sprint9.js'));
app.use("/sprint10", require('./app/routes/sprint10.js'));
app.use("/mvp", require('./app/routes/mvp.js'));

// auto render any view that exists

app.get(/^\/([^.]+)$/, function (req, res) {

	var path = (req.params[0]);

	res.render(path, function(err, html) {
		if (err) {
			console.log(err);
			res.sendStatus(404);
		} else {
			res.end(html);
		}
	});

});

// start the app

app.listen(port);
console.log('');
console.log('Listening on port ' + port);
console.log('');
