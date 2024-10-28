## Chapter 10. Working with REST APIs - SpaceX project

# Lesson 1. Working with REST APIs - SpaceX project. Introduction

https://academy.zerotomastery.io/courses/1206554/lectures/32067384

Este tonto hablando tonterias sobre Elon Musk y su SpaceX

# Lesson 2. The Space X API

https://academy.zerotomastery.io/courses/1206554/lectures/32081395

- We are gonna use the open source API of SpaceX. We need to explore it bebore to fetch the data we need

SpaceX REST API on GitHub
https://github.com/r-spacex/SpaceX-API

# Lesson 3. Versioning Node APIs

https://academy.zerotomastery.io/courses/1206554/lectures/32081411

- We verion an API in order to update it in production and gives the chance to our clients to update at their own pace. That means grouping all your routes in your API under one version and keep old version around. You may decide to decapricate old version in the future but versioning allows you gradually to move all the users who are using your API to a newer version. We want to avoid all the user to avoid all at once

1. Create a file (api) inside routes folder
2. Move the logic of routes in app to this file:
   const express = require('express');

   const planetRouter = require('./planets/planets.router')
   const launchesRouter = require('./launches/launches.router')

   const api = express();

   api.use('/planets', planetsRouter);
   api.use('/launches', launchesRouter);

   module.exports = api;

- We need to update the path when requiring planetsRouter and launchesRouter and sustitute <app> for <api>.

3. src/app.js. Import api as middleware and Set the version in the URL path:

   app.use('/v1', api);

- Now the URL will be like this:
  localhost:8000/v1/planets

* the "v1" will be place before the endpoints

4. Update the client (frontend) witht he new URL
   srcçhooksçrequest.js:
   const API_URL = 'http://localhost:8000/v1';

# Lesson 4. Updating Our API Tests

https://academy.zerotomastery.io/courses/1206554/lectures/32081413

5.  Update launches.test.js with the new endpoint (placing the /v1/)

        .get('/v1/launches')

    .post('/v1/launches')

# Lesson 5. Exploring Space X launches

https://academy.zerotomastery.io/courses/1206554/lectures/32058371

N: Checking the missions rockets sent by Musk
https://github.com/r-spacex/SpaceX-API

# Lesson 6. Running search queries

https://academy.zerotomastery.io/courses/1206554/lectures/32067786

- The developers has includede a POSTman collection for Xpace X API

search:
https://github.com/r-spacex/SpaceX-API

click in Docs:
https://github.com/r-spacex/SpaceX-API/blob/master/docs/README.md

Run in POSTman

N: Using POST method to populate a request. Sometimes the initial request return a collection of objects as a string in order to save space and time, and then we need to populate the key with this method... weid talk...

- It is saved in a collection in POSTman (my_spaceX)

# Lesson 7. Loading Space X data in our API

https://academy.zerotomastery.io/courses/1206554/lectures/32067799

Using the same process of POSTman with axios... long explanation

1. server.js Load data from SpaceX API before start server:

const {loadLaunchData} = require('./models/launches.model');

async function startServer(){
await mongoConnect();
await loadPlanetsData();
await loadLaunchData();

    server.listen(PORT, ()=>{
        console.log(`listenning to port: ${PORT}`)
    });

}

2. Terminal. Install axios

cd server
npm install axios

3.  src/model.launches.model.js. Assign the URL of ScpaceX to a constant:
    const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

4.  src/model.launches.model.js. Create <loadLaunchData> function and fetch the data. This will be move it into another function to clean the code:

    const response = await axios.post(SPACEX_API_URL, {
    query:{},
    options:{
    pagination: false,
    populate:[
    {
    path: 'rocket',
    select: {
    name: 1
    }
    },
    {
    path: 'payloads',
    select:{
    'customers':1
    }
    }
    ]
    }
    });

        const launchDocs = response.data.docs;

- Normally the data coming from the fetch will be storage in <response.data> but in this case, the all the data is saved in array named <docs> that is why we sae it like this <response.data.docs>

5.  Mapping SpaceX so we know where the data is coming from to populate our launch object:

const launch = {
flightNumber: 100, // flig_number
mission: "Kepler exploration X", // name
rocket: "Explorer IS1", //rocket.name
launchDate: new Date('December 27, 2030'), //date_local
target: "Kepler-442 b", // not applicable
customers: ['ZTM', 'NASA'], // payload.customer for each payload
upcoming: true, // upcoming
success: true // success
};

# Lesson 8. Mapping SpaceX Data to our Database

https://academy.zerotomastery.io/courses/1206554/lectures/32067834

Create a function to use axios in order to fetch the launch from SpaceX project (Elan Musk).
function loadLaunchData

1.  We get the data that we need to populate (early explanation why).
2.  Looping thru the fetched data and Create a const (launch). The value from the function has to match the value of SPACEX project (check POSTman my_Space collection)
3.  Get the value for customer is more complicated becase the are two arrays that need to be flatted:

           const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload)=>{
            return payload['customers'];
        });

4.  Apply the mapping:

    const launchDocs = response.data.docs;
    for(const launchDoc of launchDocs){
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload)=>{
    return payload['customers'];
    });

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            //target: "Kepler-442 b", // not applicable
            customers,
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success']
        };
        console.log(`${launch.flightNumber} ${launch.mission}`)

    }

# Lesson 9. Using paginated API

https://academy.zerotomastery.io/courses/1206554/lectures/32067892

Some API are settle to return a limit amount of collection storage in page. SPACEX returns 10 collection for page. we can determine which page and the amount we want by setting in the options:
"page": 2,
"limit": 10

- In this case we want all the pages so we set the pagination to false, like this:

  const response = await axios.post(SPACEX_API_URL, {
  query:{},
  options:{
  pagination: false,
  populate:[

# Lesson 10. Minimixing API load

https://academy.zerotomastery.io/courses/1206554/lectures/32067894

1. src/model/launches.model.js. Create a condiction in function loadLaunchData to check if we already have loaded the data otherwise we populate the database

async function loadLaunchData(){
const firstLaunch = await findLaunch({
flightNumber:1,
rocket: 'Falcon 1',
mission: 'FalconSat'
});
if(firstLaunch){
console.log('Launch data was already loaded!')
} else{
await populateLaunches();
}
}

2. src/model/launches.model.js.. create a function (populateLaunches) that contains all the logic from populating the data:

async function populateLaunches(){
console.log('Downloading some data...');
const response = await axios.post(SPACEX_API_URL, {
query:{},
options:{
pagination: false,
populate:[
{
path: 'rocket',
select: {
name: 1
}
},
{
path: 'payloads',
select:{
'customers':1
}
}
]
}
});
if(!response.status === 200){
console.log('Problem downloading data');
throw new Error('Launch download data fail')
}

    const launchDocs = response.data.docs;
    for(const launchDoc of launchDocs){
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload)=>{
            return payload['customers'];
        });

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            //target: "Kepler-442 b", // not applicable
            customers,
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success']
        };
        console.log(`${launch.flightNumber} ${launch.mission}`)

        //TODO: Populate launches collection
    }

}

# Lesson 11. Persisting SpaceX launches:

https://academy.zerotomastery.io/courses/1206554/lectures/32033895

1. <populateLaunches> function. Populate launches (save to database). At the button, call the function to save planets and pass the object(launch) we built:
   await saveLaunch(launch);

- At this point we got an error coz the condiction we had in <saveLaunch> function to check if the planet exist in database so we do as follow:

2. launches.mongo.js Removing the require from the launch schema for target so it will allow us to save launches from the SpaceX API
   target:{
   type: String,
   },

3. launches.model.js. Move condiction of existingPlanet from saveLaunch to scheduleLaunch. Otherwise it will throw an error when trying to save the data from SpaceX API since those planets does not exist in my mongoDB:

async function scheduleNewLaunch(launch){
const planet = await planets.findOne({
keplerName:launch.target
});

    if(!planet){
        throw new Error('No matching planet was found');
    }

}

4. <populateLaunches> function. Check for error. Before save the fetch data, we check if the response is not ok and then throw an error:
   if(!response.status === 200){
   console.log('Problem downloading data');
   throw new Error('Launch download data fail')
   }

# Lesson 12. Pagination to our endpoint I

https://academy.zerotomastery.io/courses/1206554/lectures/32034005

- Explanation of pagination: page and limit

# Lesson 13. Pagination to our endpoint II

https://academy.zerotomastery.io/courses/1206554/lectures/32048094

1. src/routes/launches/launches.controller.js. Save the query parameters that come from the request.

async function httpGetAllLaunches(req, res){
const {skip, limit} = getPagination(req.query);
const launches = await GetAllLaunches(skip, limit)
return res.status(200).json(launches);
}

2. Create a file (query) inside service:

const DEAFULT_PAGE_NUMBER = 1;
const DEAFULT_PAGE_LIMIT = 0;

function getPagination(query){
const page = Math.abs(query.page) || DEAFULT_PAGE_NUMBER;
const limit = Math.abs(query.limit) || DEAFULT_PAGE_LIMIT;
const skip = (page - 1) \* limit;

    return{
        skip,
        limit,
    }

}

module.exports = {
getPagination,
};

- function Math.abs. return an absolute positive number
- const skip = (page - 1) \* limit; If we are in page 1, then we skip cero documents because 1-1 = 0.
- const page = Math.abs(query.page) || DEAFULT_PAGE_NUMBER we pass a default value in case that the user does not pass a value

- const limit = Math.abs(query.limit) || DEAFULT_PAGE_LIMIT;. In this case we set default to 0 so the limit will be infinit.

3. src/routes/launches/launches.controller.js. Pass the getPagination Function into httpGetAllLanches function in :

const {
getPagination
} = require('../../services/query');

async function httpGetAllLaunches(req, res){
const {skip, limit} = getPagination(req.query);
const launches = await GetAllLaunches(skip, limit)
return res.status(200).json(launches);
}

3. launches.model.js: Filter the request by limit the amount of collection and skip (page), We also need to sort the request by flight numbers so it will come with the right order (descending: flightNumber: 1, ascending: flightNumber: -1 )

   async function GetAllLaunches(skip, limit){
   return await launchesDatabase.
   find({}, {
   '\_id':0, '\_\_v':0
   })
   .sort({flightNumber: 1})
   .skip(skip)
   .limit(limit);
   }

- we need to pass the parameter when we call GetAllLaunches from launches.controller(httpGetAllLaunches).

When we pass page 1, the value of skip is 0 so it wont skip any collection and we get the first values depending on the limit we set.

If we pas page 2 limit 5 then we skip the first 5 collections. URL is like this:
localhost:8000/v1/launches?limit=5&page=2
query params:
key: limit, value: 5
key: page, value:2
with the <?> we can chain param after the endpoint

# Lesson 14. Sorting Paginated Data

https://academy.zerotomastery.io/courses/learn-node-js/lectures/32048095

async function GetAllLaunches(skip, limit){
return await launchesDatabase.
find({}, {
'\_id':0, '\_\_v':0
})
.sort({flightNumber: 1})
.skip(skip)
.limit(limit);
}

- Chain a <sort> function and pass this object which determs what value the order:
  .sort({flightNumber: 1})

it could be (1) or (-1). (1) for descending order and (-1) for ascending order

# Lesson 15. Cleanning launch data

https://academy.zerotomastery.io/courses/1206554/lectures/32048096

Clear the data in mongoDB, stop the server and restart again.

# Lesson 16. Managing secret with Dotenv

https://academy.zerotomastery.io/courses/1206554/lectures/32977711

Process to secure secrets:

1. Install dotenv package at root server:
   cd server
   npm install dotenv

2. Create .env file at root server

3. copy the port and the key in .env
   PORT = 8000
   MONGO_URL = mongodb+srv://nasa-api:G3cfoPxqorKUve20@nasa.8bgxoyf.mongodb.net/

4. src/service/mongo.js Connect the value of the access string that is saved in .env, like this:
   const MONGO_URL = process.env.MONGO_URL;

5. Require dotenv like this:
   require('dotenv').config();

- It has to be above all the local require so this is affect the whole app.

6. Add .env to .gitignore

# Lesson 17. Securing leaked secrets

https://academy.zerotomastery.io/courses/1206554/lectures/32977714

We can change the password of our database directly in Atlas in case that we have leaked out password to GitHub

# Resumen:

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
