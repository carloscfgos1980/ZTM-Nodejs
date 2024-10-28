## Testing APIs

- All the codes comes from NASA project

# Lesson 1. Testing in Node

https://academy.zerotomastery.io/courses/1206554/lectures/31987559

# Lesson 2. Testing APIs with Jest

https://academy.zerotomastery.io/courses/1206554/lectures/31987560

- Test runner
- Test fixtures
- Assertions
- Mocking

* Install Jest npm package for testing. It is a development dependency coz we use the test during development, we dont need to test out test during production
  cd server
  npm install jest --save-dev

  "scripts": {
  "test": "jest",
  "test-watch": "jest --watch",
  "watch": "nodemon src/server.js",
  "start": "node src/server.js"
  },

# Lesson 3. Testing APIs endpoints with supertest. Get

https://academy.zerotomastery.io/courses/1206554/lectures/31988379

cd server
npm install supertest --save-dev

N: I have a bug when testing GET and trying to validate 'Content-Type', /json/.

# Lesson 4. Testing APIs endpoints with supertest. POST

https://academy.zerotomastery.io/courses/1206554/lectures/31996284

# Lesson 5. Testing APIs endpoints with supertest. POST error cases

https://academy.zerotomastery.io/courses/1206554/lectures/31996285
