const express = require('express');
const path = require('path');
const cors = require('cors');
const { json } = require('body-parser');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const loadedFiles = loadFilesSync("**/*",{ extensions: ["graphql"] })
const loadedResolvers = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"))

const PORT = 4000;

async function startApolloServer() {
    // Required logic for integrating with Express
    const app = express();
    
    const schema = makeExecutableSchema({
        typeDefs: loadedFiles,
        resolvers: loadedResolvers
    })

    // This Apollo server object contains all the middleware and
    // logic to handle incoming graphical requests    
    const server = new ApolloServer({
        schema
    });

    // Ensure we wait for our apollo server to start
    await server.start();
    // Connect apollo middleware with express server
    app.use(
        '/graphql',
        cors(),
        json(),
        expressMiddleware(server, {
            context: async ({req}) => ({token: req.headers.token}),
        }),
    );
    
    app.listen(PORT, () => {
        console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)
    })
}

startApolloServer();