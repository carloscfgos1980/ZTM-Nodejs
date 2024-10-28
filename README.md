## Nodejs

# Chapter 01.Node-basics

REPL - Reading, Evualuation, Printing, Looping. Nodejs
API - Application Programming Interface

- modules-example-commonJS
- modules-example-ECMA
- using-index

# Chapter 02.NodeJs-Fundamentals-Package

- 2.1 create-npm-package
- 2.2 2.2 package-example

# Chapter 03. Nodejs files IO Planet project

- Exploring Planets With Node
- Importing Kepler Space Telescope Data
- Setting Up Our CSV Parser
- Streaming Large Data Files
- Reading Our Planets Data
- Parsing Our Planets Data
- Finding Habitable Planets
- Exploring Habitable Planets

* This module is about how to use Nodejs to get data, filtered and storage in our Hd

# Chapter 04. Nodejs server

http - stands for hyper text ransfer protocol
https - secure version that encrypts our communication

- What is a Web Server?
- HTTP Requests
- HTTP Responses
- First Webserver
- HTTP APIs and Routing
- Parameterized URLs
- Same Origin Policy
- Cross Origin Resource Sharing (CORS)
- POSTing Data to the server
- Request and Responses as stream

# Chapter 05. EXPRESS API

- Why Express?
- Introduction to Express
- Route parameters
- Postman and Insomnia
- Development dependencies (nodemon)
- Middleware
- Writing Our Own Logging Middleware
- POST Requests in Express
- Model View Controller (MVC)
- Model View Controller in Express
- Express Routers
- RESTful APIs (REpresentation, State,Transfer)
- Create Read Update and Delete (CRUD)
- Sending files
- Serving websites with nodes
- Templates engines (hbs)

# Chapter 06.NASA fulll stack project

- Introduction and Architecture. This is complete with the last lesson that the diagram is uptated! Using Lucid Charts
- Brief explanation of React
- Explanation of the client app (Nasa project)
- set the backend (RESTful API) structure
- Get Planets route
- CORS Middleware. This is only used while running the client from PORT 3000, then when se serve the client is not really neede anymore
- Models vs Controllers vs Routes. Explanation of API structure
- Planets model. Applying the functionality of planets project app to get the habitable planets and send it to the planets.controller
- Automating fullstack application with NPM
- Run React in production
- Looging request with Morgan
- Launches model. Functions to get all launches, a single launch, add a launch and delete a launch, actually is not delete but set to false the success so it keeps this data but is not shown in the client side
- Serving Application with Client Side Routing
- Working with Data Models. Building a Data Access Layer. This is very theorical nevertheless very important to show my skill set!
- POST /launches: Creating Launches
- Validation for POST request
- Connection POST/launches with Frontend. Implement functionality with the fetch function in the CLient
- DELETE/launch: Aborting launch. This is one I had a bug in the fetch function in the Client (request.js)!

# Chapter 07.Testing API

- Testing in Node. Concepts. 3 different levels of testing (from top to botton): GUI Test, API Layer test, Unit test
- Testing APIs with Jest: test runner, test fixture, assertion and mocking (not implemented yet)
- Testing APIs endpoints with supertest. Get
- Testing APIs endpoints with supertest. POST. Testing Date
- Lesson 5. Testing APIs endpoints with supertest. POST error cases (missing element in the request and giving wrong data as Date)

# Chapter 08.Improving Node performance

- Node server performance
- There are two main ways to solve the blocking of the thread pool by to many request that use "expensive functions" like sorting: clustering and workers threads.
- perfomance-example to explain clustering and the use of MP2 module
- concept of load balancing
- MP2 explained and implemented in Nasa porject
- MP2 reload server to allow us to have Zero Downtime restart
- Workers thread explained. This is not the recommend it method. Instead we use <clustering> with the <Round-Robin> approach

# Chapter 09. Databases

- Introduction to databases
- Comparing SQL vs NoSQ
- SQL vs MongoDB. Schemas, references and ACID transitions
- Setting Up and connecting MongoDb. Here I had a bug, something realted with the Mongo string connection.
- Create Mongoose Schema
- Creating models for schemas
- Inserting and updating documents. Saving Launches. Combination of <updateOne> and <upsert>
- objectsId explained
- Excluding value from the Response
- Auto increment in MongoDB. This is a builtin function in SQL database but not in mongoDB
- Scheduling new launches: findOneAndUpdate + upsert
- Abort launches: updateOne. This does not return the json object that changed. This app does not delete the collection, instead change to false success and upcoming.
- Updating Test for Mongoose. Create a separate file for mongo connections inside <service> folder. Wrap all the test in another describe function that will include connect and disconnect mongoDB. Also some scrip to make Jest possible to use with Mongoose.
- Updating project arquitecture

# Chapter 10. RESTAPIs - SpaceX project

- Explanation abot what s ScapeX and how to work with its RESTFul API
- Versioning Node APIs
- Updating Our API Tests
- Running search queries for SpaceX with POSTMan. This is a particular case that POST is used to get data, we need to paas an Id to get extra data like payload and rocket info in order to obtain the name of the rocket.
- Loading Space X data in our API
- Mapping SpaceX Data to our Database
- Using paginated API and Minimixing API load
- Persisting SpaceX launches
- Pagination to our endpoint
- Sorting Paginated Data
- Cleanning launch data
- Managing secret with Dotenv
- Securing leaked secrets

# Chapter 11. Node security + authentification

- Security and Authentification overview
- Encrypted connections with SSl and TLS
- Digital certificates, signing and Man in the middle attacks
- Setting out Security example
- HTTPS witn Node, Self Signed Certificates and Public Key Cryptography
- Helmet (middleware to protect our connection)
- Authentication vs Authorization (401 - bad authentication, 403 - no authorization)
- Social Signing
- API keys
- JWTTokens
- The aith standards
- OAUTH 2.0 Authorization Code Flow
- OAUTH in Action with single sign in
- Registering with Google Authorization Server
- Authentification Endpoints with middleware
- Passport.js (library for authentification)
- Dotenv for Client Secret
- Authentification with Google and OAuth
- Cookie based authentification
- Sessions
- Server VS Client side sessions With Cookies
- Session Middleware in Express
- Setting Up OAuth Cookie Session
- Sessions with the Latest Version of Passport.js
- Reading and Writing the OAuth Session
- Restricting Access to Endpoints
- Implementing Logout
- Asynchronous Logout

# Chapter 12. Continous Integration and Delivery

- Introduction to CI and CD
- Continuos Integration (CI)
- Continuos Delivery (CD)
- ontinous deployment (CD)
- Pipelines
- GitHub Actions
- Setting Up GitHub Actions
- Continuos Integratin pipelines
- Build pipeline in Actions
- itHub Actions Markplace
- Continuos integration pipeline
- Mocking Databases
- Database with Continous integration
- Populating database for Continuos Integration
  N: Build a pipeline CI/CD gives us the confidence that our code is correct and ready to deploy. It is necessary checking that avoid issues later.

# Chapter 13. Node production- Docker+AWS

- Deploy to the Cloud
- Serveless vs Containers
- Virtual machine
- What is a container
- Installing Docker
- Our first Docker container
- Your docker account
- Creating a Docker file
- Improving our Docker file with layer
- Updating our API URL
- Building NASA project Docker image
- Running NASA project in a container
- Pushing image into Docker Hub
- Exploring Amazon Web Service
- Creating an EC2 Instance
- What is SSH (stands for Security Shell)
- Connecting To Our EC2 Instance With SSH
- Setting Up Our EC2 Server
- Deploying Our NASA API

# Chapter 14. GraphQL

- GraphQL Overview
- Our First GraphQL Query
- GraphQL Queries In Action
- GraphQL vs REST: Over-fetching & Under-fetching
- GraphQL vs REST Summary
- Exploring GraphQL Implementations
- GraphQL In Node
- Working With Deprecated Packages
- Recommended: Migrating GraphQL Packages
- GraphiQL
- Designing An E-Commerce Schema
- GraphQL Tools
- Modularizing Large GraphQL Projects: Schemas
- Resolvers
- Modularizing Large GraphQL Projects: Resolvers
- Filtering with Queries and Resolvers
- Exercise: Query Products By ID
- Implementing Mutations on the Server
- Exercise: Add New Product Review
- GraphQL With Apollo
- Building an Apollo Server with Node.js

# Chapter 15. Sockets with Nodejs

- Introduction to Sockets
- Polling
- What is a Socket?
- Sockets VS Polling
- WebSockets
- Introduction to socket.io
- socket.io Client and Server APIs
- Multiplayer Pong Overview
- Reviewing Our Pong Front End
- Multiplayer Pong Message Sequence
- Setting Up a socket.io Server
- Connecting to socket.io
- Identifying Connected Clients
- Listening for Events in the Pong Server
- Handling Events in the Pong Client
- Implementing the Game Logic: Paddle
- Implementing the Game Logic: Ball
- What Happens When You Disconnect?
- Using Socket.io with Express
- Namespaces
- Rooms
