## 14. GraphQL

Course Source code. This course show a graphql server and then how to migrate to apollo server framework so there are 2 projects!

https://github.com/odziem/graphql-example

# Lesson 1. GraphQL Overview

https://academy.zerotomastery.io/courses/1206554/lectures/34307059

# Lesson 2. Our First GraphQL Query

https://academy.zerotomastery.io/courses/1206554/lectures/34307061

N: Practising GraphQL in a Github page

{
film(filmID: 2) {
title
producers
}
}

# Lesson 3. GraphQL Queries In Action

https://academy.zerotomastery.io/courses/1206554/lectures/34307063

# Lesson 4. GraphQL vs REST: Over-fetching & Under-fetching

https://academy.zerotomastery.io/courses/1206554/lectures/34307067

N: graphQL is better for Online stores coz this is only one endpoint, by solving Over-fetching & Under-fetching!

# Lesson 5. GraphQL vs REST Summary

https://academy.zerotomastery.io/courses/1206554/lectures/34309617

**GrahpQL advantages :**

- Stateless that allow us to create clusters and scale our servers more easily.
- endpoints that are easily to navegate.
- It follows the HTTP protocol, without underfetcht data. Single request. Prevent over fectching also.
- Give us schemas and types. Schemas describes our data and make easy to discover, to understand what data is available in our API. And <types> ensures that the data pass back and for in our queries is valid.
  -Large scale projects. GraphQL speed up development

  **GraphQL disadvantages :**

  - Flexibility adds complexity. it is a single post request to the server but with the complexity of the query langua so the front end need to know how to do this. It is not worht it for small scale projects.
  - Difficult to cache
  - Not RESTful. Not such a large community

N: GraphQl can works along side RESTful API. One example is with authorization

# Lesson 6. Exploring GraphQL Implementations

https://academy.zerotomastery.io/courses/1206554/lectures/34312873

- GraphQl can be buillt in any language: nodejs, C++, javascript, etc.
- There are several frameworks to work with grahpQL. This course will use Apollo.

# Lesson 7. GraphQL In Node

https://academy.zerotomastery.io/courses/1206554/lectures/34312875

npm init -y
npm install express
npm install graphql
npm install express-graphql

- This last package is already decapricated!

# Lesson 8. Working With Deprecated Packages

https://academy.zerotomastery.io/courses/1206554/lectures/49842499

# Lesson 9. Recommended: Migrating GraphQL Packages

https://academy.zerotomastery.io/courses/1206554/lectures/49842501

npm install graphql-yoga

# Lesson 10. GraphiQL

https://academy.zerotomastery.io/courses/1206554/lectures/34357743

N: It is better Test queries with graphiQL when using Yoga that with POSTman

server.js
app.use('/graphql', createYoga({
schema: schema,
graphiql: true,
}));

- Once grahpiQL is enable we can make request directly from the browser to the hollowing URL:
  htto://localhost:3000/graphql
  and this load the tools from Graphiql in GitHub

# Lesson 11. Designing An E-Commerce Schema

https://academy.zerotomastery.io/courses/1206554/lectures/34357746

Example:
const schema = buildSchema(`
type Query {
products: [Product]
orders: [Order]
}

    type Product {
        id: ID
        description: String!
        reviews: [Review]
        price: Float
    }

    type Review {
        rating: Int!
        comment: String
    }

    type Order {
        date: String!
        Subtotal: Float!
        items: [OrderItem]
    }

    type OrderItem {
        product: Product!
        quantity: Int!
    }

`);

N: description: String! means that description is required

# Lesson 12. GraphQL Tools

https://academy.zerotomastery.io/courses/1206554/lectures/34357749

Check for tools
https://the-guild.dev/graphql/tools

# Lesson 13. Modularizing Large GraphQL Projects: Schemas

https://academy.zerotomastery.io/courses/1206554/lectures/34357750

N: Installing packages that help us to module large scale projects

1. Create a folder for the products and order query
2. Create the file to place the schemas. This files are .graphql, in this example products.graphql and orders.graphql.
3. Inside correspond folder, create a model.js file for the data

4. Install tools schema and load files tools and use in server.js:

npm install @graphql-tools/schema
npm install @graphql-tools/load-files

const {makeExecutableSchema} = require('@graphql-tools/schema');

const typesArray = loadFilesSync('\*_/_', {
extensions: ['graphql'],
});

const schema = makeExecutableSchema({
typeDefs: typesArray,
});

# Lesson 14. Resolvers

https://academy.zerotomastery.io/courses/1206554/lectures/34357752

# Lesson 15. Modularizing Large GraphQL Projects: Resolvers

https://academy.zerotomastery.io/courses/1206554/lectures/34361287

1. Create functions in the model file that will be passed to the resolvers. Resolver has to be as thin as possible. All the business logic takes place in the model file. products.model.js:
   function getAllProducts(){
   return products
   }

2. Create the resolvers file inside the correspond folder. Ex products.resolver.js

const productsModel = require('./products.model');

module.exports = {
Query:{
products:()=>{
return productsModel.getAllProducts();
},
}
}

3. Load the file and execute in the Schema in server.js
   const resolversArray = loadFilesSync('\*_/_', {
   extensions: ['resolvers.js'],
   });

const schema = makeExecutableSchema({
typeDefs: typesArray,
resolvers: resolversArray
});

# Lesson 16. Filtering with Queries and Resolvers

https://academy.zerotomastery.io/courses/1206554/lectures/34361292

1. Add the filtered query in products.graphql:
   productsByPrice(min: Float!, max: Float!): [Product]

2. Create a function to filter the products in products.model.js: and export this function:

function getProductByPrice(min, max){
return products.filter((product)=>{
return product.price >=min && product.price <= max;
})
}

3. Filter function resolve. products.resolver.js:
   productsByPrice: (\_, args)=>{
   return productsModel.getProductByPrice(args.min, args.max);
   },

N: productsByPrice: (\_, args) is a function that receive arguments, the first one is the parent argument that is usually static data, in this case we don't use it so it substitute for \_.

- The name of the arguments (args) must be the same in the schema, the resolver and the query made by the client.

# Lesson 17. Exercise: Query Products By ID

https://academy.zerotomastery.io/courses/1206554/lectures/34369325

1. Add the filtered by id query in products.graphql:
   product(id: ID!): Product

2. Create a function to filter (find) a product by id in products.model.js: and export this function:

function getProductsById(id){
return products.find((product)=>{
return product.id === id
})
}

3. Filter function resolve. products.resolver.js:
   product:(\_,args)=>{
   return productsModel.getProductsById(args.id);
   }

# Lesson 18. Implementing Mutations on the Server

https://academy.zerotomastery.io/courses/1206554/lectures/34403824

1. products.graphql. Add Mutatio, which is a high level functionality just like Query.

type Mutation {
addNewProduct(id: ID!, description: String!, price: Float!): Product
}

2. products.model.js. Function to add new product
   function addNewProduct(id, description, price){
   const newProduct = {
   id,
   description,
   price,
   reviews: []
   }
   products.push(newProduct);
   return newProduct;
   }

3. products.resolvers.js
   Mutation:{
   addNewProduct:(\_, args)=>{
   return productsModel.addNewProduct(args.id, args.description, args.price);
   },
   }

# Lesson 19. Exercise: Add New Product Review

https://academy.zerotomastery.io/courses/1206554/lectures/34403826

1. products.graphql. Add Mutatio, which is a high level functionality just like Query.
   addNewProductReview(id: ID!, rating: Int!, comment: String): Review

2. products.model.js. Function to add new product

function addNewProductReview(id, rating, comment){
const matchedProduct = getProductsById(id)

if(matchedProduct){
const newProductReview = {
rating,
comment,
};
matchedProduct.reviews.push(newProductReview);

    return newProductReview;

}
}
N: First check that the product exist by re using the same function for select product by id.

3. products.resolvers.js
   addNewProductReview:(\_, args)=>{
   return productsModel.addNewProductReview(args.id, args.rating, args.comment);
   }

# Lesson 20. GraphQL With Apollo

https://academy.zerotomastery.io/courses/1206554/lectures/49989690

N: Apollo is the most used graphql framework. It is a fullstack!

# Lesson 21. Building an Apollo Server with Node.js - Part 1

https://academy.zerotomastery.io/courses/1206554/lectures/49842834

Migrating graphql example into apollo format

1. Uninstall package that we don't need anymore:
   npm uninstall grapghql
   npm uninstall grapghql-yoga

2. Decapricate the require of this packages in server.js

3. Change the middleware in the endpoint.
   Before:
   app.use('/graphql', createYoga({
   schema: schema,
   graphiql: true,
   }));

After:
app.use('/graphql', expressMiddleware(server));

# Lesson 22. Building an Apollo Server with Node.js - Part 2

https://academy.zerotomastery.io/courses/1206554/lectures/49847300

1. Install Apollo server
   npm install @apollo/server

2. Require apollo server
   const {ApolloServer} = require('@apollo/server');

3. Create async function startApolloServer() and place inside it:
   const app = express();

   const schema = makeExecutableSchema({
   typeDefs: typesArray,
   resolvers: resolversArray
   });

4. pass the schema into apollo server:
   const server = new ApolloServer({
   schema,
   });

5. Start the server:
   await server.start();

6. Use cors and express-json middlewares:
   app.use(cors());
   app.use(express.json());

7. Middleare from apollo server to connect with express:
   const {expressMiddleware} = require('@apollo/server/express4');

8. Use above apollo-express middleware with the endoint:
   app.use('/graphql', expressMiddleware(server));

9. Call the function to start the server. Everything look like this:

async function startApolloServer(){
const app = express();

    const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray
    });

    const server = new ApolloServer({
        schema,
    });

    await server.start();

    app.use(cors());
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server));

    app.listen(3000, ()=>{
    console.log('Running GraphQL server...')
    });

}

startApolloServer();

N: Even when we uninstall graphql and graphql-yoga packages. We still use graphql tool packages!

## Lesson 23. Building an Apollo Server with Node.js - Part 3

https://academy.zerotomastery.io/courses/1206554/lectures/49847298

N: Explanation how to work with Apollo sandbox frontend. It is like a fully featured POSTman
