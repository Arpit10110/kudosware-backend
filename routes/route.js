import express from "express";
const router = express.Router();
import {SignUP,login,sendotproute, Fpassword,profile} from "../controllers/user.js"
router.get("/",(req,res)=>{
    return(
        res.send("Welcome to the backend of Kudosware!")
    )
})
router.get("/port",(req,res)=>{
    return(
        res.send(`Port is ${process.env.PORT}`)
    )
})

router.post("/signup",SignUP);
router.post("/login",login);
router.post("/fpassword",Fpassword);
router.post("/profile",profile);
router.post("/sendotproute",sendotproute);


export default router;