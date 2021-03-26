const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
//const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
   cookieSession({
       maxAge: 30 * 24 * 60 * 1000,
       keys: [keys.cookieKey]
   })
);

app.use(passport.initialize());
app.use(passport.session());


//return routes, require the auth returns 
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//configuartion for express server

if (process.env.NODE_ENV == 'production'){
 // express will serve up production assets like our main.js

  app.use(express.static('client/build'));
 // express will serve up the index.html 
  
// if we don't know the route, check the path sendFile()
 const path = require('path');
 app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
 });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);