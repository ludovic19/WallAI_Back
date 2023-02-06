import express from "express";
import verify from "../Middlewares/verify.js";
import Users from "../MongoDB/models/users.js";

const userRoutes = express.Router()

// userRoutes.get('/users', verify, async (req, res) => {
//     try {
//         res.json(req.user)
//     }
//     catch(err){
//         res.json(err)
//     }
// })

userRoutes.get('/users', (req, res) => {
    Users
    .find()
    .then(user => 
        res.json(user)
        )
    .catch(err => res.json(err))
})

userRoutes.get('/users/:id', (req, res) => {
    Users
    .findOne({_id : req.params.id})
    .then(user => 
        res.json(user)
        )
    .catch(err => res.json(err))
})

userRoutes.put('/users/:id', async (req,res) => {
    await Users.findOneAndUpdate({_id : req.params.id}, {$set : req.body}, {new : true})
    .then(newUser => res.json(newUser))
    .catch(err => res.json(err))
})


export default userRoutes