const express = require('express');
const {createYoga} = require('graphql-yoga');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const {loadFilesSync} = require('@graphql-tools/load-files');

const typesArray = loadFilesSync('**/*', {//**/* => means look in any subdirectory for a file witht his extension
  extensions: ['graphql'],
});

const resolversArray = loadFilesSync('**/*', {
    extensions: ['resolvers.js'],
});


const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray
});

const app = express();

app.use('/graphql', createYoga({
    schema: schema,
    graphiql: true,
}));

app.listen(3000, ()=>{
    console.log('Running GraphQL server...')
});