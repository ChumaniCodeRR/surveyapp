
const passport = require('passport');

//error function

module.exports = (app) => {

    //send request to google
app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);
//router handler
app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
        //console.log(res);
        //redirect not going to port 3000 
        res.redirect('/surveys');
    }
);

// user logout

app.get('/api/logout', (req, res) => {
   req.logout();
   res.redirect('/');
})

// current user
app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

};


