require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const { typeDefs, resolvers } = require("./schema");

const dbUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@sandbox.oyhve.mongodb.net/${process.env.MONGO_CLUSTER_URL}?retryWrites=true&w=majority`;
mongoose.connect(dbUri, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({ app });

app.use((req, res) => {
    res.status(200);
    res.send("Hello!");
    res.end();
});

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
