const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require('../verifyToken');

//CREATE

router.post("/", verify, async (req, res)=>{  //the "verify" jwt middleware is used here
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body);

        try{
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You are not an admin, so can't post movies");
    }
});


//UPDATE

    router.put("/:id", verify, async (req, res)=>{  //the "verify" jwt middleware is used here
    if(req.user.isAdmin){
        try{
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },{new: true});
            res.status(200).json(updatedMovie);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You are not an admin, so can't update movies");
    }
});


//DELETE

router.delete("/:id", verify, async (req, res)=>{  //the "verify" jwt middleware is used here
    if(req.user.isAdmin){
        try{
            await Movie.findByIdAndDelete(req.params.id,);
            res.status(200).json("movie deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You are not an admin, so can't delete movies");
    }
});


//GET

    router.get("/find/:id", verify, async (req, res)=>{  //the "verify" jwt middleware is used here
    try{
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET RANDOM MOVIE

    router.get("/random", verify, async (req, res)=>{  //the "verify" jwt middleware is used here
    const type = req.query.type;
    let movie;
    try{
        if(type=== "series"){
            movie = await Movie.aggregate([
                { $match: {isSeries: true} }, //"isSeries" is one of the properties in the Movie model schema.
                { $sample: { size: 1 } }, //this means the program should give you one random series.
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: {isSeries: false} }, //"isSeries" is one of the properties in the Movie model schema.
                { $sample: { size: 1 } }, //this means the program should give you one random movie.
            ]);
        }
        res.status(200).json(movie);
    }catch(err){
        res.status(500).json(err);
    }
});


//GET ALL MOVIES

router.get("/", verify, async (req, res)=>{  //the "verify" jwt middleware is used here
    if(req.user.isAdmin){
        try{
            const movies = await Movie.find();
            res.status(200).json(movies.reverse()); //".reverse" makes it display the movies starting from the latest uploaded
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You are not an admin, so can't get all movies");
    }
});


module.exports = router;
    