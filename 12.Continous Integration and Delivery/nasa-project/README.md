## Full stack app Nasa project

- Client was given by the ZTM course. Nevertheless, I had to make some adjustments related to the fetching.

- Backend using Expres framwwork and MVC model:

1. Download a CSV file from the Nasa website, store it in my app and use builtin node functions to emit and listen to events in order to read this file using stream method cos it is a very large file. I filtered out the data I needed (just the name of the habitable planets). This data is saved in a mongoDB and is query by using planet's endpoint. These planets are displayed as a drop down by the client.
2. Implement a second endpoint (launches) in order to schedule new missions and save them into the nasa-api database in mongoDB.
3. Serve the client from the server.
4. Testing at API layer level suing Jest and supertest packages.
5. Improve performance by using MP2 that includes the cluster mode and Robin-Round approach.
6. Fetch Data from SpaceX API and storage in our launches collection.
7. Versioning, pagination and sorting paginated data.

- Continuous-Integration-Delivery into this repository to check for errors- Create an image in Docker
- Upload the app. Set in production with AWS. This is the website:

http://16.16.201.72:8000/

- This course also includes other features:

**Extra Bonus**

# Security-authentification

https://github.com/carloscfgos1980/ZTM-Security-authentification.git

# GraphQL

https://github.com/carloscfgos1980/ZTM-GraphQL.git

# Sockets

https://github.com/carloscfgos1980/ZTM-Sockets.git

**The whole course could be found here:**

https://github.com/carloscfgos1980/ZTM-Complete_Node_Course.git

**I have also done other courses beside Nodejs that could be a plus**

# SQL-course

https://github.com/carloscfgos1980/ZTM-SQL-course.git

# System_Design_Architecture

https://github.com/carloscfgos1980/ZTM-System_Design_Architecture.git
