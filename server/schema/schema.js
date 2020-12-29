const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

//dummy data, will be adding the database later on ...
let books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorID: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorID: "3" },
  { name: "The long Earth", genre: "Sci-Fi", id: "3", authorID: "2" },
];

let author = [
  { name: "Peter Pan", age: 43, id: "1" },
  { name: "Ron Weasly", age: 24, id: "2" },
  { name: "Hermione Granger", age: 19, id: "3" },
];

const AuthorType = new GraphQLObjectType({
  name: "Authors",
  fields: () => ({
    // requires an object of proerties of the object, hence the mandatroy {} in the fucntion
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    id: { type: GraphQLID },
  }),
});

//Created a graphQL object tyupe schema, the id, name and genre require a special graphql data tyupe to tell graphql that
// the values would be of the type string, this is the first step into building the schema.
const BookType = new GraphQLObjectType({
  // GraphQLObjectType requries an object
  name: "Book",
  fields: () => ({
    // creating a callback function to return the values of the datatype
    id: { type: GraphQLID }, // id is a type of string
    name: { type: GraphQLString }, // name is a type of string
    genre: { type: GraphQLString }, // genre is a type of string
    author: {
      //not passing any arguments for this  type
      // with this particular type, we're asking for the author details along with the book
      type: AuthorType, //
      resolve(parent, args) { //resolver function
        console.log(parent);
        return _.find(author, { id: parent.authorID }); //lodash function responsible for returning the author of the book requested
      },
    },
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
      args: { id: { type: GraphQLID } }, // while sending in the query the book data needed would be identified using the args(which is Id of the book in this case) keyword
      resolve(parent, args) {
        // when the query is recieved, the resolve function is fired hence defining the resolved function.
        // the id parameter passed to the graphql api would be accessible with the property as args.id
        // code to get data from the database or other source
        console.log(typeof args.id);
        return _.find(books, { id: args.id }); // returning the lodash function which runs through the array and return the book and the details associated
      },
    },
    author: {
      // same as the booktype, adding the custom graphql datatype, args and the resolver function, this type is used only when we're requesting the author
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(author, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  // defining the schema allow only the queries defined by the developer to go through
  query: RootQuery,
});
