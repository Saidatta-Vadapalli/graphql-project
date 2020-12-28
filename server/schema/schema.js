const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//Created a graphQL object tyupe schema, the id, name and genre require a special graphql data tyupe to tell graphql that
// the values would be of the type string, this is the first step into building the schema.

//dummy data, will be adding the database later on ...
var book = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The long Earth", genre: "Sci-Fi", id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    // creating a callback function to return the values of the datatype
    id: { type: GraphQLString }, // id is a type of string
    name: { type: GraphQLString }, // name is a type of string
    genre: { type: GraphQLString }, // genre is a type of string
  }),
});

// The root queries are how we describe the user can jump into the graph and grab data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      // this name is chosen cause the end user will query the grapql api using this name.
      // one possible thing the user might request, is to provide find the book details hence defining it in the root resolver
      type: BookType, // setting the type to define a custom graphql datatype
      args: { id: { type: GraphQLString } }, // while sending in the query the book data needed would be identified using the args(which is Id of the book in this case) keyword
      resolve(parents, args) {
        // when the query is recieved, the resolve function is fired hence defining the resolved function.
        // the id parameter passed to the graphql api would be accessible with the property as args.id
        // code to get data from the database or other source
        _.find(book, { id: args.id }); // lodash function which runs through the array and return the book and the details associated
      },
    },
  },
});

module.exports = new GraphQLSchema({
  // defining the schema allow only the queries defined by the developer to go through
  query: RootQuery,
});
