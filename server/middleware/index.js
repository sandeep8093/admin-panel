const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let user;
    if (req.headers.authorization) {
      console.log(req.headers.authorization)
        const token = req.headers.authorization.split(" ")[1];
        try {
            user = jwt.verify(token, process.env.JWT_SECRET);
            console.log(user)
        } catch {
            err = {
                name: 'TokenExpiredError',
                message: 'auth token expired'
            }
            return res.status(400).json(err);
        }
    }
    req.user = user;
    
    if (!user) {
        return res.status(400).json({ error: 'auth token not found' });
    }
    next();
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not allowed to do that!");
      }
    });
  };


module.exports={
    verifyToken,
    verifyTokenAndAdmin
}
