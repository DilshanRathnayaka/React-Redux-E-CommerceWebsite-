const router = require("express").Router();
const User = require("../Models/User")

//Check username details
router.post("/",async(req,res)=>{
    try{
        const username = req.body.username;
       
        const user = await User.findOne({username:username})
        if(user){
            res.status(200).json(user)
        }
    }catch(err){
        res.status(400).json(err)
    }
})

module.exports = router;