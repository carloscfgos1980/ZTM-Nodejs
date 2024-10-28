## Improve Node performance

Code for this section:
https://github.com/odziem/performance-example

# Lesson 1. Node server performance

https://academy.zerotomastery.io/courses/1206554/lectures/31731082

Node is a single thread software and sometimes could be blocked (thread pool) by certain functions when it recieve multi requets at the same time

- check <Node multi thread> diagram

# Lesson 2. Building a simple blocking Function

https://academy.zerotomastery.io/courses/1206554/lectures/31763681

This <performance-example> is a very basic API to show how the thread pool could be blocked by delay (expensive functions). Delay function we are simulating the extreme case of blocking behaviour

# Lesson 3. Real Life Blocking functions

https://academy.zerotomastery.io/courses/1206554/lectures/31731723

JSON.stringify({}) => "{}"
JSON.parse("{}") => {}
[4,5,6,7,1].sort();

- Also the encrypting functions!

# Lesson 4. Running multiple node processes

https://academy.zerotomastery.io/courses/1206554/lectures/31740833

# Lesson 5. The Node cluster module

https://academy.zerotomastery.io/courses/1206554/lectures/31740905

Theory explanation of Cluster module

# Lesson 6. Cluster module in Action

https://academy.zerotomastery.io/courses/1206554/lectures/31740923

- This is called: <Round Robin>

N: JavaScript is a single thread so when blocking functions are running, one function nees to wait for the other to finish. This is solved by cluster which assigs workers (forks) and the the process run simuntanously

performance-example.js:
const cluster = require('cluster');

app.get('/', (req, res)=>{
res.send(`performance example: ${process.pid}`)
});

app.get('/timer', (req, res)=>{
delay(9000)
res.send(`Ding ding ding: ${process.pid}`)
});

if(cluster.isPrimary){
console.log('Master has been started');
cluster.fork();
cluster.fork();
} else{
console.log('Worker process started')
app.listen(3000);
}

process.pid => Use the buitin process module to get the id of the current process

Heads up! As part of a broader naming shift in the computer industry, Node.js has deprecated the term “master” as the name of the main process that spawns the worker processes. The most updated version of the cluster.isMaster property is cluster.isPrimary, although you may still find cluster.isMaster in Node.js projects for some time. The only difference is the name of the property, everything else works exactly the same!

# Lesson 7. Operating System Schedulers

https://academy.zerotomastery.io/courses/learn-node-js/lectures/49847302

Node works with <Schedulers> following the <Round-Robin> approach. All request are distributed into each process individually, by by one, in a circular faction

- in Window maybe something else must be done in order that round robin to work

# Lesson 8. Maximixing Cluster performance

https://academy.zerotomastery.io/courses/1206554/lectures/31750880

performance-example.js:

const os = require('os');

if(cluster.isMaster){
console.log('Master has been started');
const NUM_WORKERS = os.cpus().length;
for(let i = 0; i < NUM_WORKERS; i++){
cluster.fork();
}

} else{
console.log('Worker process started')
app.listen(3000);
}

N: For loop to create the amount of workers (fork) that the CPU allos us to have

# Lesson 9. Load balancing

https://academy.zerotomastery.io/courses/1206554/lectures/31751468

Round-Robin is just one strategy for what is called <load balancing>

- check <Load balancer> diagram

<Horinzontal scaling> => We grow our application to handle more requests by adding more servers, or in a case or our cluster, more processes.

<Vertical scaling> => Add mor speed to our Node processes, by replacing our CPU with a faster one.

- Here finish the example with clustering

# Lesson 10. The PM2 tool

https://academy.zerotomastery.io/courses/1206554/lectures/31751678

PM2 stands for Advance Production Manager for Nodejs. Info about it could be find in thies website:
https://pm2.keymetrics.io

This uses the cluster mode that we learn in previous lessons. PM2 uses the cluster module internally but it provide many capabilities to help you manage that cluster

# Lesson 11. Using PM2

https://academy.zerotomastery.io/courses/1206554/lectures/31763959

npm install pm2

N: In this lesson is installed globally in oder to demostraste de features

When using PM2 we don't need to use anymore the bultin module <cluster>, neither to build <workers>

- This is the command to initialize PM2 with the max amount of workers to take advantage of the amount of CPU in our pc:
  pm2 start server -i max

- Get the logs:
  pm2 logs

- Get the 200 last lines of logs:
  pm2 logs --lines 200

# Lesson # 12. Managing Live Clusters With PM2

https://academy.zerotomastery.io/courses/1206554/lectures/31764544

- PM2 is not really usefull in development but in production

- Start the server with PM2 and save the logs in a file name logs.txt with the max amount of instances:
  pm2 start server.js -l logs.txt -i max

- Get detailed info by running:
  pm2 show

- In a terminal outside VSCode. Get to the folder with the project and run
  pm2 monit

This help us to check how our CPUs are using the energy when a request is done

# Lesson 13. Zero Downtime Restart

https://academy.zerotomastery.io/courses/1206554/lectures/31773062

pm2 reload server

- This is the best way to update servers that are already live and serving users particulary with applications that are time sensitive

Bonus: Deployment Strategies On Google Cloud:
https://cloud.google.com/architecture/application-deployment-and-testing-strategies

# Lesson 13. Improving Performance Of Our NASA Project

https://academy.zerotomastery.io/courses/1206554/lectures/31796362

1.  Install pm2 in the server
    cd server
    npm run pm2

2.  Script to start pm2.
    package.json in nasa-project/server

    "cluester": "pm2 start src/server.js -i max"

    N: -i max. Means that we get the max amount of worker in the cluster.

3.  Write script in root folder package.json to run mp2

    "deploy-cluster": "npm run build --prefix client && npm run cluster --prefix server",

- Now when we start the server and try to make more than one launch, it does not work!. Since there are several processes, the data saved in the Map is saved in different places. That is why the server has to be stateless (save no data). This data has to be saved somewhere else (database)

# Lesson 14. Worker threads

https://academy.zerotomastery.io/courses/1206554/lectures/31996295

- For this example we are going to use <threads-example> app.

<Worker threads> uses the V8 in isolate instead of multiple processes like <clustering>

- check <Clustering vs workers threads> diagram

Clustering running multiple instances of Node in separate processes while workers thread run multitple instances of Node in the same process by taking advante of that V8 isolate feature

Node Worker Threads Module
https://nodejs.org/api/worker_threads.html

# Lesson 15. Workers thread in action

https://academy.zerotomastery.io/courses/1206554/lectures/31996298

This app shows in the terminal how the main thread and the workers share the same Id process. Also the process run in parallel, by sorting the data.

- the <workers threads> approach is not as rocket solid as the <cluster> approach. In production is recommend it to use the cluster method

# Resume:

- Node server performance
- There are two main ways to solve the blocking of the thread pool by to many request that use "expensive functions" like sorting: clustering and workers threads.
- perfomance-example to explain clustering and the use of MP2 module
- concept of load balancing
- MP2 explained and implemented in Nasa porject
- MP2 reload server to allow us to have Zero Downtime restart
- Workers thread explained. This is not the recommend it method. Instead we use <clustering> with the <Round-Robin> approach
