const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');

const PORT = 4000;

const app = express();

const loadedFiles = loadFilesSync("**/*",{
    extensions: ["graphql"]
})

const loadedResolvers = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"))

const schema = makeExecutableSchema({
    typeDefs: loadedFiles,
    resolvers: loadedResolvers
})

app.use('/graphql' , graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)
})