require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const sslRedirect = require('heroku-ssl-redirect');

const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash      = require("connect-flash");
const ProgressBar = require('progressbar.js');
const helpers = require('handlebars-helpers');

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
app.use(sslRedirect());

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(__dirname + '/node_modules/progressbar.js/dist'));
//app.use(express.static(path.join(__dirname, '../node_modules/progressbar.js/dist/progressbar.js')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
      throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

hbs.registerHelper('minus', helpers.math().minus);
hbs.registerHelper('add', helpers.math().add);

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);
    

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const codesRoutes = require('./routes/code');
app.use('/code', codesRoutes);
      
const voucherRoutes = require('./routes/voucher');
app.use('/voucher', voucherRoutes);
      
module.exports = app;


/*
 {{#if user.finalPrize}}
        {{#if user.prizeAvailable}}
          <button class="btn voucher voucher-button" id="voucher-generate" data-value="5c9388d54bf0178cca021b6d">CANJEAR</button>
          {{else}}
          <p>Lo sentimos, ya tenemos 10 ganadores para el viaje a Bariloche. Pero puedes seguir canjeando tus puntos por otros premios!</p>
        {{/if}}
      {{/if}}
*/