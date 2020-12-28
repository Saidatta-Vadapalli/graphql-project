"use strict";

var express = require("express");

var _require = require("express-graphql"),
    graphqlHTTP = _require.graphqlHTTP;

var app = express();
app.use("/graphql", graphqlHTTP({}));
app.listen(4000, function () {
  console.log("Now listening for requests on port 4000");
});