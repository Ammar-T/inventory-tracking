require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");

const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const mongoose = require("mongoose");

const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

const port = process.env.SERVER_PORT || 8080;
const dbURI = `mongodb+srv://take2:take2@cluster0.uq2aj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../client/build")));

const httpServer = http.createServer(app);

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req }),
  cors: cors(),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server.start().then(() => {
  server.applyMiddleware({ app });

  mongoose
    .connect(dbURI)
    .then(() => {
      console.log("Connected to MongoDB");
      return httpServer.listen(port);
    })
    .then((res) => {
      console.log(
        `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
      );
    })
    .catch((err) => console.log(err));
});
