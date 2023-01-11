const router = require("express").Router();
const UserLogin = require("../Models/User");
const bcryptjs = require("bcryptjs");



//REGISTER
router.post('/register',async(req,res)=>{
    const files = new UserLogin({
        email: req.body.email,
        username :req.body.username,
        password: req.body.password,
    })
    try{
        const saved = await files.save();
        res.status(200).json(saved);
    }catch(err){
        res.status(400).json(err);
    }
    
})
    


//LOGIN

router.post("/login",async(req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;

        const user = await UserLogin.findOne({username:username});
        if(user){
            const isMatch = await bcryptjs.compare(password,user.password);

            if(isMatch){
                const token = await user.generateToken();
                res.cookie("jwt",token,{
                    expires :new Date(Date.now()+86400000),
                    httpOnly:true
                })
                res.status(200).json("User Logged in");
            }else{
                res.status(401).json("Invalid Credentials");
            }
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//LOGOUT
router.get('/logout',(req,res)=>{
    res.clearCookie("jwt",{path:'/'})
    res.status(200).json("userLogged Out")
})



module.exports = router;