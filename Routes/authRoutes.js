import express from "express";
import Users from "../MongoDB/models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";

//pour ajouter l'image de profil des lenregistrement
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });

const authRoutes = express.Router();
//création d'un utilisateur
authRoutes.post("/register", upload.single("image"), async (req, res) => {
  // verification si mail dans la bdd pour éviter doublons
  try {
    const emailExist = await Users.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Account already exist");
    // encryptage grâce a hash(), pour uncryptage unique salt()qui repasse 10 fois et assure que le cryptage est unique
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new Users({
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashPassword,
      image: "/public/images/preview.png",
    });

    user.save();
    res.send(`Welcome ${user.username}`);
  } catch (err) {
    res.json(err);
  }
});
// connexion de l'utilisateur deja enregistré
authRoutes.post("/login", async (req, res) => {
  //vérifier si mail existant
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found please register");
  // verifier le password avec compare( qui "déhash" le password)
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send("Wrong password, please try again");
  // ajout du token
  const token = jwt.sign({ user }, process.env.SECRET);
  res.header("auth-token", token);
  res.json([token, user]);
});

export default authRoutes;
