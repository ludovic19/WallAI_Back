import jwt from "jsonwebtoken";

//verification de l'utilisateur pour s'assurer qu'uil est bien enregistré
const verify = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(400).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next(); // fonction suivante
  } catch (err) {
    res.json(err);
  }
};

export default verify;
