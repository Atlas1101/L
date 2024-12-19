import JWT from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    token = req.cookies?.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_KEY);
    if (!decoded.username) {
      req.organization = decoded;
    } else {
      req.user = decoded;
    }
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default verifyToken;
