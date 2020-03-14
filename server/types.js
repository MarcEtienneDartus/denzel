const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLFloat
} = require('graphql');

const reviewType = new GraphQLObjectType({
    name: 'Review',
    fields: {
        date: { type: GraphQLString },
        review: { type: GraphQLString }
    }
});

// Define Movie Type
const movieType = new GraphQLObjectType({
    name: 'Movie',
    fields: {
        id: { type: GraphQLID },
        link: { type: GraphQLString },
        metascore: { type: GraphQLInt },
        poster: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        synopsis: { type: GraphQLString },
        title: { type: GraphQLString },
        votes: { type: GraphQLFloat },
        year: { type: GraphQLInt },
        review: { type: new GraphQLList(reviewType) },

    }
});

const limitedMovieType = new GraphQLObjectType({
    name: 'LimitedMovie',
    fields: {
        limit: { type: GraphQLInt },
        total: { type: GraphQLInt },
        results: { type: new GraphQLList(movieType) },

    }
});

const populateMovieType = new GraphQLObjectType({
    name: 'PopulateMovie',
    fields: {
        total: { type: GraphQLInt },
    }
});

module.exports = { movieType, limitedMovieType, populateMovieType };