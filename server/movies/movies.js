const mongo = require('../mongo.js');
const imdb = require('../imdb');

const getMoviesById = (id,callback) => {
    mongo.Find({"id":id},callback)
}

const getMoviesByScore = (metascore,callback) => {
    mongo.Find({"metascore":{"$gte":metascore}},callback)
}

const searchMovie = (limit, metascore,callback) => {
    let data = {
        "limit": limit,
        "total": limit
    }
    getMoviesByScore(metascore,(docs)=>{
        let results = []
        if(docs.length < limit) {
            data.total = docs.length
        }
        let index = 0
        while(index < data.total && index<docs.length){
            delete docs[index]["_id"];
            results.push(docs[index])
            index++;
        }
        data.results = results
        callback(data);
    })
}

const populateDatabase = (actorId, callback) => {
    mongo.RemoveAll( async ()=>{
        const movies = await imdb(actorId);
        mongo.Insert(movies,()=>{
            callback({"total":movies.length})
        })
    });
}


const reviewMovie = (actorId,date,review, callback) => {
    const reviewObject = {$push: {review:{date,review}}}
    mongo.Update({"id":actorId},reviewObject,callback)
}




module.exports = { getMoviesById, getMoviesByScore, searchMovie, populateDatabase, reviewMovie };