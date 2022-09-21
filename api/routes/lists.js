const router = require("express").Router();
const List = require("../models/List");
const verify = require('../verifyToken');

//CREATE

router.post("/", verify, async (req, res)=>{  //the "verify" jwt middleware is used here
    if(req.user.isAdmin){
        const newList = new List(req.body);

        try{
            const savedList = await newList.save();
            res.status(201).json(savedList);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You are not an admin, so can't create lists");
    }
});

//DELETE

router.delete("/:id", verify, async (req, res)=>{  //the "verify" jwt middleware is used here
    if(req.user.isAdmin){
        try{
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("The list has been deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You are not an admin, so can't delete lists");
    }
});




//GET
router.get("/", verify, async (req, res)=>{
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try{
        if(typeQuery){ //if the user clicks a type eg movies or series...
            if(genreQuery){  //if the user clicks for a particular genre eg. action, comedy etc
                list = await List.aggregate([
                    {$sample: {size: 10}}, //then he gets 10 random lists
                    {$match: {type:typeQuery, genre: genreQuery}}, //that matches the type and genre he chose
                ]);
            }
            else {  //if there's a type but no genre is selected
                list = await List.aggregate([
                    {$sample: {size: 10}}, //then he gets 10 random lists
                    {$match: {type:typeQuery}}, //that matches the type he chose
                ]);
            }
        }
        else{
            list = await List.aggregate([{$sample: {size: 10}}]); //if the user doesn't click a type, then we get 10 random lists
        }
        res.status(200).json(list);
    }catch(err){
        res.status(500).json(err);
    }
    
});

module.exports = router;