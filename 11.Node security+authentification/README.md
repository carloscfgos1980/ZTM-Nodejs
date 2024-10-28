## Node security + authentification

# Lesson 1. Security and Authentification overview

https://academy.zerotomastery.io/courses/1206554/lectures/32977714

# Lesson 2. Encrypted connections with SSl and TLS

https://academy.zerotomastery.io/courses/1206554/lectures/32517737

N: TLS es de successor of SSL. This are encrypted system!

# Lesson 3. Digital certificates, signing and Man in the middle attacks

https://academy.zerotomastery.io/courses/1206554/lectures/32517740

DC (digital certificates) - are Use to encrypt our data when it sent to thru internet. There are site that sell this certificate, sites that are world trust worthy.
We are not going to use that coz we have to pay, we are going to use a self Signed certificate but this will only works during development and not during production coz other computers will not recognize this certificate.

# Lesson 4. Setting out Security example

https://academy.zerotomastery.io/courses/1206554/lectures/32517742

# Lesson 5. HTTPS witn Node, Self Signed Certificates and Public Key Cryptography

https://academy.zerotomastery.io/courses/1206554/lectures/32517745

In this site we can install Open SSl in order to create certificates, it is probably already installed in Mac!

https://www.openssl.org

1. Create the certificate
   cd example-security

openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -day 365

-x509 means it is a self certificate
rsa:4096 is the type of encrypting and the size of the the key.
-keyout key.pem is the name of the file with the key
-out cert.pem creates a file with the certificate
-day 365 is the amount of days that will last this certificate, by default is 30 days

N: I had to type the CLI because I got an error

2. Set up the parameters to use the key and the certificate:

https.createServer({
key:fs.readFileSync('key.pem'),
cert:fs.readFileSync('cert.pem')
}, app).listen(PORT, () => {
console.log(`Listening on port ${PORT}...`);
});

- We need to import (fs)

3. Wehn load the page, we need to give permission to google chrome to open the page that will open as not secure coz we are not certificated to grant this permission globalwise.
   <<<<<<< HEAD
   =======

# Lesson 6. Helmet

https://academy.zerotomastery.io/courses/1206554/lectures/32702898

- Check the info in helmet. This is used to protect our APIs.
  https://helmetjs.github.io

1. terminal
   npm install helmet

2. Require and use the helmet middleware. server.js:

const helmet = require('helmet');
app.use(helmet());

- It has to be implemented over all the routes so it will affec them.

# Lesson 7. Authentication vs Authorization

https://academy.zerotomastery.io/courses/1206554/lectures/32702899

- failure request response:
  401 - bad authentication
  403 - no authorization

# Lesson 8. Social Signing

https://academy.zerotomastery.io/courses/1206554/lectures/32702900

# Lesson 9. API keys

https://academy.zerotomastery.io/courses/1206554/lectures/32702901

N: Explanation how to get API key from google

# Lesson 10. JWTTokens

https://academy.zerotomastery.io/courses/1206554/lectures/32702902

# Lesson 11. The aith standards

https://academy.zerotomastery.io/courses/1206554/lectures/32708908

# Lesson 12. OAUTH 2.0 Authorization Code Flow

https://academy.zerotomastery.io/courses/1206554/lectures/32708909

# Lesson 13. OAUTH in Action with single sign in

https://academy.zerotomastery.io/courses/1206554/lectures/32708911

# Lesson 14. Registering with Google Authorization Server

https://academy.zerotomastery.io/courses/1206554/lectures/32708912

https://developers.google.com/identity/protocols/oauth2

https://console.cloud.google.com/projectselector2/apis/dashboard?pli=1&supportedpurview=project

N: Follow all the steps all the tutorial to create Google credentials

# Lesson 15. Authentification Endpoints with middleware

https://academy.zerotomastery.io/courses/1206554/lectures/32712271

# Lesson 16. Passport.js

https://academy.zerotomastery.io/courses/1206554/lectures/32726627

1. Check the follow website:
   https://www.passportjs.org

2. Check for a strategy that works with google. In this case chose:
   passport-google-oauth20

3. Install in our project
   npm install passport-google-oauth20

# Lesson 17. Dotenv for Client Secret

https://academy.zerotomastery.io/courses/1206554/lectures/32726628

1. Install dotenv
   npm install dotenv

2. create a .env file and copy there the secret info

3. Require dotenv and creat a const that storage an object with the secret information
   require('dotenv').config();

const PORT = 3000;
const config = {
CLIENT_ID: process.env.CLIENT_ID,
CLIENT_SECRET: process.env.CLIENT_SECRET
};

# Lesson 18. Authentification with Google and OAuth 1

https://academy.zerotomastery.io/courses/1206554/lectures/32731020

1. Import passport and passport-google-oauth20

2. Initialize passport:
   app.use(passport.initialize());

3. Set Passport Strategy:

const AUTH_OPTIONS = {
callbackURL: '/auth/google/callback',
clientID: config.CLIENT_ID,
clientSecret: config.CLIENT_SECRET
};

function verifyCallBack(accessToken, refreshToken, profile, done){
console.log('Google profile', profile);
done(null, profile);
}

passport.use( new Strategy(AUTH_OPTIONS, verifyCallBack));

# Lesson 19. Authentification with Google and OAuth 2

https://academy.zerotomastery.io/courses/1206554/lectures/32731788

1. callback redirect function:

app.get('/auth/google/callback',
passport.authenticate('google', {
failureRedirect: '/failure',
successRedirect: '/',
session: true,
}),
(req, res)=>{
console.log('Google called us back!')
}
);

app.get('/failure', (req, res)=>{
return res.send('Failed to log in');
});

2. First step of loggin process:
   app.get('/auth/google',
   passport.authenticate('google', {
   scope:['email'],
   })
   );

# Lesson 20. Cookie based authentification

https://academy.zerotomastery.io/courses/1206554/lectures/32731790

N: The authentication could be done also with cookies(info that Google storage)

# Lesson 21. Sessions

https://academy.zerotomastery.io/courses/1206554/lectures/32744954

We use sessions to store temporary data as the user uses that application

# Lesson 22. Server VS Client side sessions With Cookies

https://academy.zerotomastery.io/courses/1206554/lectures/32744959

# Lesson 23. Session Middleware in Express

https://academy.zerotomastery.io/courses/1206554/lectures/32744964

# Lesson 24. Setting Up OAuth Cookie Session

https://academy.zerotomastery.io/courses/1206554/lectures/32744966

1. Install express cookie package
   npm i cookie-session

2. Implement cookie session middleware, right below helmet middleware

const cookieSession = require('cookie-session');

app.use(cookieSession({
name: 'session',
maxAge: 24 _ 60 _ 60 \* 1000,
keys:[config.COOKIE_KEY_1, config.COOKIE_KEY_2],
}));

# Lesson 25. Sessions with the Latest Version of Passport.js

https://academy.zerotomastery.io/courses/1206554/lectures/49849299

N: Middleware to Fix a bug with express and cookie session package:

app.use(cookieSession({
name: 'session',
maxAge: 24 _ 60 _ 60 \* 1000,
keys:[config.COOKIE_KEY_1, config.COOKIE_KEY_2],
}));

app.use((req, res, next)=>{
if(req.session && !req.session.regenerate){
req.session.regenerate = (cb)=>{
cb();
}
}
if(req.session && !req.session.save){
req.session.save = (cb)=>{
cb();
}
}
next();
});

# Lesson 26. Reading and Writing the OAuth Session 1

https://academy.zerotomastery.io/courses/1206554/lectures/32744970

# Lesson 27. Reading and Writing the OAuth Session 2

https://academy.zerotomastery.io/courses/1206554/lectures/32746330

1. Save the session to cookie
   passport.serializeUser((user, done)=>{
   done(null, user.id);
   });

2. Read the sesion from the cookie
   passport.deserializeUser((id, done)=>{
   done(null, id);
   });

3. Authenticate the session that is sent to the server. This middleare is placed under passport.initialized middleware:

app.use(passport.session());

# Lesson 28. Restricting Access to Endpoints

https://academy.zerotomastery.io/courses/1206554/lectures/32747593

1. Middleware to check login:
   function checkLoggedIn(req, res, next){
   const isLoggedIn = req.isAuthenticated() && req.user;
   if(!isLoggedIn){
   return res.status(401).json({
   error: 'You must log in'
   })
   };
   next();
   };

N: req.isAuthenticated() => It is a feature from passport to make sure the user is legit!

2. Apply the middleware
   app.get('/secret', checkLoggedIn, (req, res)=>{
   return res.send('Your secret value is 42!');
   });

# Lesson 29. Implementing Logout

https://academy.zerotomastery.io/courses/1206554/lectures/32756726

# Lesson 30. Asynchronous Logout

https://academy.zerotomastery.io/courses/1206554/lectures/49847305

app.get('/auth/logout', (req, res,next)=>{
req.logout((err) => {
if (err) {
return next(err);
}
res.redirect('/');
});
});

N: Due an update in express the method to log out changed. That is why there are 2 lessons for logout!

# Lesson 31. Experimenting With Fake Sessions

https://academy.zerotomastery.io/courses/1206554/lectures/32756727

# Lesson 32. Wrap Up and Next Steps

https://academy.zerotomastery.io/courses/1206554/lectures/32756728
