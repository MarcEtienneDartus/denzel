const express = require('express');
const movies = require('./movies');
const router = express.Router();

router.get('/populate/:id', async (req, res) => {
    const { id } = req.params;
    movies.populateDatabase(id,(total)=>{
        res.send(total)
    });
});

router.get('/', (req, res) => {
    movies.getMoviesByScore(70,(docs)=>{
        const radonmIndex = Math.floor(Math.random() * docs.length)
        delete docs[radonmIndex]["_id"];
        res.send(docs[radonmIndex])
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    if(id==="search"){
        let { limit, metascore } = req.query;
        if(limit === undefined) limit = 5;
        if(metascore === undefined) metascore = 0;
        movies.searchMovie(parseInt(limit), parseInt(metascore),(docs)=>{
            res.send(docs)
        })
    }
    else{
        movies.getMoviesById(id,(docs)=>{
            delete docs[0]["_id"];
            res.send(docs[0]);
        }); 
    }
});

router.post('/:id', (req, res) => {
    const { id } = req.params;
    const { date, review } = req.query;
    movies.reviewMovie(id,date,review,(docs)=>{
        res.send({});
    })
});

module.exports = router;