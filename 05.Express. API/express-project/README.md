## 05. EXPRESS API

# Lesson 1. Why Express?

https://academy.zerotomastery.io/courses/learn-node-js/lectures/31818533

Express is the most popular backend framework for javascript

# Lesson 2. Introduction to Express

https://academy.zerotomastery.io/courses/1206554/lectures/31818536

1. Initialize npm with default values:
   npm init -y

2. Install express
   npm install express

3. Require express and save it in a variable:
   const express = require('express');

4. Set the application for the server:
   const app = express();

5. Declare the PORT:
   const PORT = 3000;

6. On the server, we call the listen function:
   app.listen(PORT, ()=>{
   console.log(`The port is listenning in port ${PORT}...`)
   });

7. Rename index.js into server.js. Like this we can simply start our application with npm start

N: Express looks into all registered routes handlers and it finds a match runs the call back we pass in and if nothing match we get 404 (NOT FOUND). It all set automatically the header of Application-Type

# Lesson 3. Express vs Next.js vs Koa

https://academy.zerotomastery.io/courses/1206554/lectures/31818534
N: Koa is another framework like express

# Lesson 4. Route parameters

https://academy.zerotomastery.io/courses/1206554/lectures/31818535

Route parameters are used to select a single item from an array of objects, usually we use Id.

1. Data (array of friends)
   const friends = [
   {
   id:0,
   name: 'Albert Einstein'
   },
   {
   id:1,
   name: 'Sir Issac Newtoon'
   }
   ]

2. route to get all the friends:
   app.get('/friends', (req, res)=>{
   res.status(200).json(friends);
   });

3. Route to get a single friend
   app.get('/friends/:friendId', (req, res)=>{
   const friendId = Number(req.params.friendId);
   const friend = friends[friendId];
   if(friend){
   res.status(200).json(friend)
   } else {
   res.status(400).json({
   error: "Friend does not exist!"
   })
   }
   });

- const friendId = Number(req.params.friendId). The Id that comes from the url is a string so we need to convert it into a number.
- if(friend) => Check if the friend exist otherwise send an error as a response

# Lesson 5. Postman and Insomnia

https://academy.zerotomastery.io/courses/1206554/lectures/31985039

Insomnia is just like Postman!

# Lesson 6. Development dependencies

https://academy.zerotomastery.io/courses/1206554/lectures/31985123

- npm install nodemon --save-dev
- package.json. write this script:
  "watch": "nodemon server.js",
- npm run watch

* This will apply the changes without the need to restart the server and installed under devDependencies. It means that it will not be included during production. nodemom package is only a tool in roder to update the code and not be necessary to restart the app.

# Lesson 7. Middleware

https://academy.zerotomastery.io/courses/learn-node-js/lectures/31985643

Middleware are functions that works between the request and the response.

- check <middleware> diagram

Middleware always finish with the next function. eg:

app.use(function(req, res, next){

next();
})

# Lesson 8. Writing Our Own Logging Middleware

https://academy.zerotomastery.io/courses/learn-node-js/lectures/31985135

- Middleware is placed over the Routes!

1. Logging Middleware for the method and the url:
   app.use((req, res, next)=>{
   console.log(`${req.method}  ${req.url}`);
   next();
   })

2. Logging Middleware for the method, the url and the time that the process last:
   app.use((req, res, next)=>{
   const start = Date.now()
   next();
   const delta = Date.now() - start
   console.log(`${req.method} ${req.url} ${delta}ms`);
   })

- delta is placed after next() coz that is the time the response come back from the endpoint middleware!

# Lesson 9. POST Requests in Express

https://academy.zerotomastery.io/courses/1206554/lectures/31985513

1. json middleaware is needed to add new item (POST)
   app.use(express.json());

2. POST route:
   function postFriend(req, res){
3. Check if the friend exist, otherwhise throw an error:
   if(!req.body.name){
   return res.status(400).json({
   error: 'Missing friend name'
   })
   }
4. Create a object:
   const newFriend = {
   name: req.body.name,
5. id is calculated by getting the length of friends array
   id:friends.length
   };
6. Add new object to the array:
   model.push(newFriend);
7. Response:
   res.json(newFriend);
   }

# Lesson 10. Model View Controller (MVC)

https://academy.zerotomastery.io/courses/1206554/lectures/31985646

Check this site for further info:
https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller

It is a patter to tell us how to organize various pieces of our code to tell us what to do

Controller => Make request. The controller understandsand process that user request and manipulate the MODEL accordingly, for example by adding or removing data to the database. When the MODEL is updated, the VIEW react to those changes and the User sees the updated data.

Controller => is tech function that react to the incoming request and set the respond accordingly.
Model => Includes any function that we use to access Data (database- MongoDB). It contains the representation of how the express application sees that data which is not necessarily the same of how this data is represented in the database. The Model can translate the data as it lives in the storage and how that data is used in our application.
VIEW => is how that data is presented back to the user. When we are building APIs, this VIEW could be just the json data that we send to the CLIENT.

- Follow this patterns are very important!

# Lesson 11. Model View Controller in Express

https://academy.zerotomastery.io/courses/1206554/lectures/31985646

1. Create <model> folder and <friends.model.js> inside it. Then copy the data into this file and export it:

const friends = [
{
id:0,
name: 'Albert Einstein'
},
{
id:1,
name: 'Sir Issac Newtoon'
}
]

module.exports = friends

2. Create <controllers> folder
3. Create <friends.controller.js> and <messages.controller.js> inside <controllers> folder

4. Copy all the functions into friends.controller.js:

- Using name function instead of arrow function in the controllers helps us to identify an error in the console.

  3.1 Get the data from the Model
  const model = require('../models/friends.model');

  3.2 Post function
  function postFriend(req, res){
  if(!req.body.name){
  return res.status(400).json({
  error: 'Missing friend name'
  })
  }
  const newFriend = {
  name: req.body.name,
  id:model.length
  };
  model.push(newFriend);

        res.json(newFriend);

  }

  3.3 Get all friends:
  function getFriends (req, res){
  res.json(model)
  }

  3.4 Get single friend
  function getFriend(req, res){
  const friendId = req.params.friendId;
  const friend = model[friendId];
  if(friend){
  res.status(200).json(friend);
  }else{
  res.status(404).json({
  error: 'Friend does not exist'
  });
  }
  }

  3.5 Export functions:
  module.exports = {
  postFriend,
  getFriends,
  getFriend,
  }

5. server.js. Require friendsController funtion and use in in the routes:

app.post('/', friendsController.postFriend);
app.get('/', friendsController.getFriends);
app.get('/:friendId', friendsController.getFriend);

6. Copy functionality into messages.controller.js:
   function getMessages(req, res){
   res.render('messages', {
   title: "messages to my friend",
   friend: "Elan Musk",
   })
   }
   5.1 Export function
   module.exports ={
   getMessages,
   }

7. server.js. Require messagesController funtion and use in in the routes:

app.get('/', messagesController.getMessages);

# Lesson 11. Express Routers

https://academy.zerotomastery.io/courses/1206554/lectures/31991547

A Router is like a mini application. It contains its own set of middleware and routes. We use a Route to break down our application and make more modular

1. Create <routes> folder
2. Create <friends.router.js> file
3. Write the code for friends route:
   3.1 Require express
   const express = require('express');

3.2 Save expres router in a variable
const friendsRouter = express.Router();

3.3 require riendsController:
const friendsController = require('../controllers/friends.controller');

3.4 middleware to log ip address:
friendsRouter.use((req, res, next) => {
console.log('ip address:', req.ip);
next();
});

3.5 Create the routes:
friendsRouter.post('/', friendsController.postFriend);
friendsRouter.get('/', friendsController.getFriends);
friendsRouter.get('/:friendId', friendsController.getFriend);

3.6 Export friendRouter so it can be used in server.js
module.exports = friendsRouter;

3.7 server.js. Require friendsRouter and save it in a variable:
const friendsRouter = require('./routes/friends.router');

3.8 server.js Mount friendsRouter
app.use('/friends', friendsRouter)

- I had a bug in the app. server.js:
  I had this:
  app.use('/', friendsRouter)
  Instead of this:
  app.use('/friends', friendsRouter)

4. Write the code for messages route:
   const express = require('express')
   const messagesRouter = express.Router();

const messagesController = require('../controllers/messages.controller')

messagesRouter.get('/', messagesController.getMessages);
messagesRouter.post('/', messagesController.postMessage);

module.exports = messagesRouter;

server.js. Require messagesRouter and mount it in the app:

const messagesRouter = require('./routes/messages.router');
app.use('/messages', messagesRouter)

- Explanation like friends route
- the require is done just after require express and the mounting is done just above the listening function (at the bottom)

# Lesson 12. RESTful APIs

https://academy.zerotomastery.io/courses/1206554/lectures/31992045

RESTful stands for
RE - REpresentation
S - State
T - Transfer

- <REpresentation> and <State> is how your data is available and <Transfer> is how your data is sent back to the User.
- RESTful is make use of existence standards (HTTP, JSON, URL).
- Endpoints are collection of data. They are plural, eg: friends, messages.
- Use HTTP methods (GET, POST, PUT, PATCH, DELETE) to communicate the action that we are performing in that collection of data.
- Client and Server architecture
- Stateless and cacheable. Stateless means that each request is separated and not connected to any any state on the Client that is not included in the request. We can catch request by saving the results for future use.

# Lesson 13. Create Read Update and Delete (CRUD)

https://academy.zerotomastery.io/courses/1206554/lectures/31991549

CRUDS common language for backend developers and stands for:
Create (Post)
Read (Get)
Update (PUT, PATCH)
Delete (Delete)

# Lesson 11. Sending files

https://academy.zerotomastery.io/courses/1206554/lectures/31996091

Sending a file. It make use of the path module in nodejs in order to place inside the sendFile function. This create a relative path to access to the file I want to send:
const path = require('path')

    res.sendFile(path.join(__dirname, '..', 'public', 'images', 'holtenbroek.jpeg'));

Explanation of the relative path (\_\_dirname, '..', 'public', 'images', 'holtenbroek.jpeg')
\*\*dirname => gets the name of the folder where this file is located.
'..' => gotta go un folder up
'public', 'images' => are the embedded folders where the picture is located
'holtenbroek.jpeg' => name of the picture

# Lesson 12. Serving websites with nodes

https://academy.zerotomastery.io/courses/1206554/lectures/32002852

Create a middleware for the static (very basic) app in server.js:
app.use('/site', express.static(path.join(\_\_dirname, 'public')));

acces at this URL:
http://localhost:3000/site/index.html

- We use <path> to get the relative location where <public> folder is located in order to avoid bugs.

- The very basic static app is in public

# Lesson 13. Templates engines

https://academy.zerotomastery.io/courses/1206554/lectures/32002853

We can find the docs in this site:
https://expressjs.com/en/resources/glossary.html

npm install hbs --save

- Create a views folder and move the index.html there. Then change the extension to hbs. It important to have the npm hbs installed already!

Use this to pass values to the index.hbs
app.get('/', (req, res)=>{
res.render('index', {
title: 'My friends are very',
caption: 'Holtenbroek!'
})
})

- Tremendo arroz con mango, no entendi ni pinga y no se ni pa que se usa...

# Lesson 14. Layouts and separations

https://academy.zerotomastery.io/courses/1206554/lectures/32003648

- Lot of complications that I wont use. I will uploud it just in case.

**Resumen:**

- Express conceptual explanation
- Route parameters
- Postman
- Nodemon (Development dependency)
- Middleware. Conceptual explanation and implementation
- POST request
- MVC. Model View Controller. Explanation and implementation:
- Router: Mini app to manage the routes
- Model: Data and functions to manipulate data
- Controller: Manage requests and responses
- RESTful APIs. Conceptual explanation
- Sending files
- Serving websites with nodes
