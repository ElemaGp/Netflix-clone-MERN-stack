const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js"); //library for hashing and unhashing password
const verify = require('../verifyToken');

//UPDATE

router.put("/:id", verify, async (req, res)=>{  //the "verify" jwt middleware is used here
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){ //if the user tries meets the criteria above and wants to change password
            req.body.password = CryptoJS.AES.encrypt(     //this hashes the password he inputs
                req.body.password, 
                process.env.SECRET_KEY
                ).toString()
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, 
            {
                $set:req.body
            },
            {new: true}
            );
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can update only your account")
    }
});
//DELETE
router.delete("/:id", verify, async (req, res)=>{  //the "verify" jwt middleware is used here
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("user has been deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can only delete your account")
    }
});
//GET A USER
router.get("/find/:id", async (req, res)=>{  
    
        try{
            const user = await User.findById(req.params.id);
            const {password, ...info} = user._doc //destructuring the user object's properties into "password" and other "info"
            res.status(200).json(info);
        }catch(err){
            res.status(500).json(err);
        }
    }
);
//GET ALL USERS
router.get("/", verify, async (req, res)=>{  //the "verify" jwt middleware is used here
    const query = req.query.new; //query for fetching only new users
    if(req.user.isAdmin){
        try{
            const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
            res.status(200).json(users);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You're not an admin, so can't see all users")
    }
});
//GET USER STATS
router.get("/stats", async (req,res)=>{
const today = new Date();
const lastYear = today.setFullYear(today.setFullYear() - 1);


try{
    const data = await User.aggregate([
        {
            $project:{
                month: {$month: "$createdAt"}  //what month it is (eg january will be 1, february will be "2")
            }
        },{
            $group: {
                _id:"$month",
                total: {$sum:1} //sum of users per month
            }
        }
    ]);
    res.status(200).json(data)
}catch(err){
    res.status(500).json(err)
}

});

module.exports = router;