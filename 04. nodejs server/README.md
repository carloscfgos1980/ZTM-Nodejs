# 04. Nodejs server

# vocabulary

http - stands for hyper text ransfer protocol
https - secure version that encrypts our communication

# Lesson 1. What is a Web Server?

https://academy.zerotomastery.io/courses/1206554/lectures/31785822

- check <web server> diagram

Explanation:

1. The client comunicate with DNS (domain Name System) server
2. DNS server send a number that represents the IP address
3. Client comunica with the HTTP server using http or https
4. HTTP server sends back data to the client

- As developer, we don't need to worry much about DNS server coz after the first request, the info is storage in the DNS cache in order to improve performance.

# Lesson 2. Introduction to HTTP Responses and Requests

https://academy.zerotomastery.io/courses/1206554/lectures/31785938

# Lesson 3. HTTP Requests

https://academy.zerotomastery.io/courses/1206554/lectures/31786114

**Methods:**

- GET
- POST
- PUT/PATCH
- DELETE

**Request composition:**

1. Method
2. Path (resource we are reaching in the backedn)
3. Body (Get method does not require body)
4. Headers. This are optional properties that you can specify in the request to send send additional meta data to the server, like the size of the data or any authentication information that you need to send so the server know that you are allow to access certain information. The most important header is the HOST, eg: facebook.com

- check <http request> diagram

# Lesson 4. HTTP Responses

https://academy.zerotomastery.io/courses/1206554/lectures/31786263

**HTTP Responses:**

1. Headers
2. body
3. Status code

- check <http responses> diagram

**Responses code:**

- 100 group is internal. We rarely use them
- 200. Success
- 300. Redirect
- 400. Error in the request. 401 => error to log in. 403 => You are log but not authorized. 404 => Not found
- 500 server error

# Lesson 5. Our First Webserver

https://academy.zerotomastery.io/courses/1206554/lectures/31786607

- Request and Response are readable stream!

index.js:

const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res)=>{
res.writeHead(200, {
'Content-Type': 'text/plain'
});
res.end('Hello, Sir Issac Newton is your friend!')
});

server.listen(PORT, ()=> {
console.log(`Listening on port ${PORT}...`);
});

- We can send also json data like this:

const server = http.createServer((req, res)=>{
res.writeHead(200, {
'Content-Type': 'application/json'
});
res.end(JSON.stringify(
{
id: 1,
name: 'Sir Issac Newton'
}));
});

- We nees to convert the data into stream, that is why we use builtin function (JSON.stringify)

# Lesson 6. HTTP APIs and Routing

https://academy.zerotomastery.io/courses/1206554/lectures/31786686

- This server is an event emitter!
- Different URL in the same route (path) are called <end points>

index.js:

server.on('request', (req, res)=>{

    if(req.url === '/friend'){
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify(
        {
        id: 1,
        name: 'Sir Issac Newton'

}));
} else if(req.url === 'messages'){
res.setHeader('Content-type', 'text/html')
res.write('<html>');
res.write('<body>');
res.write('<ul>');
res.write('<li>Hello Issac</li>');
res.write('<li>what the hell!</li>');
res.write('</ul>');
res.write('</body>');
res.write('</html>');
res.end()
} else{
res.statusCode = 404;
res.end()
}
});

- Till here only show an object with end point friends, an HTML page with message endpoint and 404 if the endpoint does not match

# Lesson 7. Parameterized URLs

https://academy.zerotomastery.io/courses/1206554/lectures/31844063

1. Create an array of objects (friends) and save in a variable:
   const friends = [
   {
   id: 0,
   name: 'Nikola Tesla',
   },
   {
   id: 1,
   name: 'Sir Isaac Newton',
   },
   {
   id: 2,
   name: 'Albert Einstein',
   }
   ];

2. Split the url
   server.on('request', (req, res)=>{
   const items = req.url.split('/');

3. Check if there is endpoint after friends route
   if( items[1] === 'friends'){
   res.statusCode = 200;
   res.setHeader('Content-type', 'application/json');
   if(items.length === 3){
   const friendIndex = Number(items[2])
   res.end(JSON.stringify(friends[friendIndex]))
4. If there is not endpoint then return the whole array of friends
   }else{
   res.end(JSON.stringify(friends));
   }
5. Check if the route is equal to message
   } else if(items[1] === 'messages'){
   res.setHeader('Content-type', 'text/html')
   res.write('<html>');
   res.write('<body>');
   res.write('<ul>');
   res.write('<li>Hello Issac</li>');
   res.write('<li>what the hell!</li>');
   res.write('</ul>');
   res.write('</body>');
   res.write('</html>');
   res.end()
   } else{
   res.statusCode = 404;
   res.end()
   }

});

# Lesson 8. Same Origin Policy

https://academy.zerotomastery.io/courses/1206554/lectures/31859480

Exmaple:
https://www.google.com:443/maps

Protocol: https
Host: www.google.com
Port: :443

The origin is the combination of Protocol, Host and Port. The browser uses the policy of same origin. It is a security feature that secures what you can browse while you are surfing thru internet.

# Lesson 9. Exercise: Same Origin Policy

https://academy.zerotomastery.io/courses/learn-node-js/lectures/31996029

Let's test our knowledge of the browser's Same Origin Policy! See if you can answer three quick questions about the following scenario:

Say you're browsing a page on www.wikipedia.org. In general, will the following requests succeed, or fail?

1. A JavaScript GET request to www.bank.com.

2. A JavaScript POST request to www.bank.com.

3. Clicking an HTML link to a video on www.bank.com.

Here we go! There are possible exceptions, but in general the following will be true:

1. This request will FAIL, because requests to get information from a cross-origin domain are not allowed by the browser. The browser is trying to protect your privacy by preventing www.wikipedia.org from stealing your private information from www.bank.com.

2. This request will SUCCEED. This is a little known exception to the Same Origin Policy! The decision to allow POST requests is mostly historical, but there is also a lower chance that a POST request will steal your private information. POST requests are used to write data to a server, rather than GET data from it, so it's less likely the response will contain private information.

3. This request will SUCCEED. The Same Origin Policy applies only to scripts and not static resources like HTML tags.

# Lesson 10. Cross Origin Resource Sharing (CORS)

https://academy.zerotomastery.io/courses/1206554/lectures/31991755

CORS => Cross Origin Resource Sharing
Access-Control-Allow-Origin will set up the host that are aloowed to get info from your server. When the server is meant to be used to anyone the is set to: \*

- Whitelisting is the practice of explicitly allowing access to a particular privilage or service . It is the opposite of blacklisting.

# Lesson 11. POSTing Data to the server

https://academy.zerotomastery.io/courses/1206554/lectures/31991756

1. Check the method and the url route:
   if(req.method === 'POST' && items[1] === 'friends'){
2. Use listener to grab the data comming from the post
   req.on('data', (data)=>{
3. Convert this buffer data (bits) into a string
   const friend = data.toString();
   console.log('request:', friend);
4. Add the new object (friend) to the array (friends)
   friends.push(JSON.parse(friend));
   });

5. Check the method and the url route to GET friends
   else if(req.method === 'GET' && items[1] === 'friends')

6. Check the method and the url route to GET messages
   else if(req.method === 'GET' && items[1] === 'messages')

7. Method to post using dev tool in the browser:

fetch('http://localhost:3000/friends', {
method: 'POST',
body:JSON.stringify({id: 3, name: 'Ryan Dahl'})
});

# Lesson 12. Request and Responses as stream

https://academy.zerotomastery.io/courses/1206554/lectures/32037886

1. Pipe request back to the response"
   req.on('data', (data)=>{
   const friend = data.toString();
   console.log('request:', friend);
   friends.push(JSON.parse(friend));
   });
   req.pipe(res);

- The pipe must be after the req.on listener otherwise it won't work coz the listener is already processing the data.

2. Method to try the post in browser:

fetch('http://localhost:3000/friends', {
method: 'POST',
body:JSON.stringify({id: 3, name: 'Grace Hopper'})
})
.then((response)=> response.json())
.then((friend)=> console.log(friend))

# Lesson 13. Web Servers Recap

https://academy.zerotomastery.io/courses/1206554/lectures/31991758

**Resume:**

- This is just an example of who works behinds the scene. We wont be using this logic, instead a framework like express.js

- Definition of Web server
- Definition of Requests and responses
- Concept of CORS
