const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(
  `mongodb://saidatta:${process.env.DB_PASSWORD}@gql-cluster.qgtp8.mongodb.net/test`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once("open", () => {
  console.log("connection to database open");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Now listening for requests on port 4000");
});

// @ 1.17.44
