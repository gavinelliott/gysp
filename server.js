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

  var router = require(__dirname + '/app/routes.js'),
      secure = require(__dirname + '/app/routes/generic.js'),
      iteration1v4  = require(__dirname + '/app/routes/iteration1-v4.js'),
      iteration2v2 = require(__dirname + '/app/routes/iteration2-v2.js'),
      iteration3v1 = require(__dirname + '/app/routes/iteration3-v1.js'),
      iteration3v2 = require(__dirname + '/app/routes/iteration3-v2.js'),
      iteration1 = require(__dirname + '/app/routes/iteration1.js'),
      demo = require(__dirname + '/app/routes/demo.js'),
      beta = require(__dirname + '/app/routes/beta.js'),
      january = require(__dirname + '/app/routes/january.js'),
      sprint3 = require(__dirname + '/app/routes/sprint3.js'),
      sprint4 = require(__dirname + '/app/routes/sprint4.js'),
      sprint5 = require(__dirname + '/app/routes/sprint5.js'),
      sprint6 = require(__dirname + '/app/routes/sprint6.js'),
      ovsea_test = require(__dirname + '/app/routes/ovsea-test.js');

app.use("/", router);
app.use("/", secure);
app.use("/beta", beta);
app.use("/demo", demo);
app.use("/iteration1-v4", iteration1v4);
app.use("/iteration2-v2", iteration2v2);
app.use("/iteration2-v4", iteration2v2);
app.use("/iteration3-v1", iteration3v1);
app.use("/iteration3-v2", iteration3v2);
app.use("/iteration1", iteration1);
app.use("/january", january);
app.use("/ovsea-test", ovsea_test);
app.use("/sprint3", sprint3);
app.use("/sprint4", sprint4);
app.use("/sprint5", sprint5);
app.use("/sprint6", sprint6);

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
