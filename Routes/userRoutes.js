import express from "express";
import * as dotenv from "dotenv";

import User from "../MongoDB/models/user";

const userRouter = express.Router()

userRouter.get('/user', (req, res) => {
    User
    .find()
    .then(user => 
        res.json(user)
        )
    .catch(err => res.json(err))
})

userRouter.get('/user/:id', (req, res) => {
    User
    .findOne({_id : req.params.id})
    .then(OneUser => res.json(OneUser))
    .catch(err => res.json(err))
})

userRouter.get('/user/email/:email', (req, res) => {
    User
    .findOne({email: req.params.email})
    .then(OneUser => res.json(OneUser))
    .catch(err => res.json(err))
})

userRouter.post('/user', (req, res)=> {
        User
    .create(req.body)
    .then(newUser => res.json(newUser))
    .catch(err => res.json(err))
    console.log(req.body)
})

userRouter.put('/user/:id', async (req,res) => {
    await User.findOne({_id : req.params.id})
    await User.updateOne({$set : req.body})
    await User.findOne({_id : req.params.id})
    .then(newUser => res.json(newUser))
    .catch(err => res.json(err))
})

userRouter.delete('/user/:id', (req, res) => {
    User.deleteOne({_id : req.params.id})
    .then(() => res.json("deleted successfully"))
    .catch(err => res.json(err))
})

module.exports = userRouter