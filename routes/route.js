import express from "express";
const router = express.Router();
import {SignUP,login, Fpassword} from "../controllers/user.js"
router.get("/",(req,res)=>{
    return(
        res.send("Welcome to the backend of Kudosware!")
    )
})

router.post("/signup",SignUP);
router.post("/login",login);
router.post("/fpassword",Fpassword);
router.get("/port",(req,res)=>{
    return(
        res.send(`Port is ${process.env.PORT}`)
    )
})


export default router;