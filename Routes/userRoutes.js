import express from "express";
import verify from "../Middlewares/verify.js";

const userRoutes = express.Router()

userRoutes.get('/users', verify, async (req, res) => {
    try {
        res.json(req.user)
    }
    catch(err){
        res.json(err)
    }
})

export default userRoutes