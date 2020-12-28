import graphql from "graphql";

const { GraphQLObjectType, GraphQLString } = graphql;

//Created a graphQL object tyupe schema, the id, name and genre require a special graphql data tyupe to tell graphql that
// the values would be of the type string, this is the first step into building the schema.

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// The root queries are how we describe the user can jump into the graph and grab data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', 
    fields: () => {
        
    }
})
