const jwt = require("jsonwebtoken")
const secret = 'please-fuck-yourself';
const tokenAuthentication = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).json({ error: "No token attached with your request" });

  jwt.verify(token, secret, (err, user) => {
    console.log(err)

    if (err) return res.status(403).json({ error: err, message: "user not verified please login" });

    req.user = user
    console.log("user found");
    console.log(user);

    next()
  });


}

module.exports = tokenAuthentication;