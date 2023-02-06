import express from "express";
import Users from "../MongoDB/models/users.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import multer from "multer";


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/images/');
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +  '.' + file.originalname.split('.').pop());
    }
  });
  
  const upload = multer({ storage: storage });

const authRoutes = express.Router()

authRoutes.post('/register', upload.single('image'), async (req, res)=> {

    try{
    const emailExist = await Users.findOne({email : req.body.email})
    if(emailExist) return res.status(400).send('Account already exist')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new Users({
        username : req.body.username,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : hashPassword,
        image : "/public/images/preview.png"
    })

    user.save()
    res.send(`Welcome ${user.username}`)
    } catch (err){
        res.json(err)
    }
})


authRoutes.post('/login', async (req, res)=> {

    const user = await Users.findOne({email : req.body.email})
    if(!user) return res.status(400).send('Email not found please register')

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Wrong password, please try again')

    const token = jwt.sign({user}, process.env.SECRET)
    res.header("auth-token", token)
    res.json([token, user])
})



// authRoutes.get('/user', (req, res) => {
//     Users
//     .find()
//     .then(user => 
//         res.json(user)
//         )
//     .catch(err => res.json(err))
// })

// authRoutes.get('/user/:id', (req, res) => {
//     Users
//     .findOne({_id : req.params.id})
//     .then(OneUser => res.json(OneUser))
//     .catch(err => res.json(err))
// })

// authRoutes.get('/user/email/:email', (req, res) => {
//     Users
//     .findOne({email: req.params.email})
//     .then(OneUser => res.json(OneUser))
//     .catch(err => res.json(err))
// })

// authRoutes.put('/user/:id', async (req,res) => {
//     await User.findOne({_id : req.params.id})
//     await User.updateOne({$set : req.body})
//     await User.findOne({_id : req.params.id})
//     .then(newUser => res.json(newUser))
//     .catch(err => res.json(err))
// })

// authRoutes.delete('/user/:id', (req, res) => {
//     Users.deleteOne({_id : req.params.id})
//     .then(() => res.json("deleted successfully"))
//     .catch(err => res.json(err))
// })

export default authRoutes