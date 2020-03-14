const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const mongo = require('./mongo.js');
const movies = require('./movies/movies')

const { movieType, limitedMovieType, populateMovieType } = require('./types.js');

//Define the Query
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,

            resolve: function () {
                return "Hello World";
            }
        },
        movie: {
            type: movieType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: (source, args) => {
                return new Promise(resolve => {
                    const { id } = args;
                    if(id !== undefined){
                        movies.getMoviesById(args.id,(docs)=>{
                            resolve(docs[0])
                        }); 
                    }
                    else{
                        movies.getMoviesByScore(70,(docs)=>{
                            const radonmIndex = Math.floor(Math.random() * docs.length)
                            resolve(docs[radonmIndex])
                        })
                    }
                });
            }
        },
        movies: {
            type: limitedMovieType,
            args: {
                limit: { type: GraphQLInt },
                metascore: { type: GraphQLInt }
            },
            resolve: (source, args) => {
                return new Promise(resolve => {
                    let { limit, metascore } = args;
                    if(limit === undefined) limit = 5;
                    if(metascore === undefined) metascore = 0;
                    movies.searchMovie(limit, metascore,(docs)=>{
                        resolve(docs)
                    })
                });
            }
        },
        populate: {
            type: populateMovieType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: (source, args) =>{
                return new Promise(resolve =>{
                    const { id } = args;
                    movies.populateDatabase(id,(total)=>{
                        resolve(total)
                    });
                })
            }
        },
        review: {
            type: GraphQLString,
            args: {
                id: { type: GraphQLString },
                date: { type: GraphQLString },
                review: { type: GraphQLString }
            },
            resolve: (source, args) =>{
                return new Promise(resolve =>{
                    const { id, date, review } = args;
                    movies.reviewMovie(id,date,review,(docs)=>{
                        resolve('done')
                    })
                })
            }
        }
    }
});

exports.queryType = queryType;