import jwt from "jsonwebtoken";
require('dotenv').config();

const verifyToken = (req, res, next) => {
  // Get the token from the request headers, query parameter, or cookie
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token using the secret or public key
    const decoded = jwt.verify(token, process.env.JWTSCRT);

    // Attach the decoded token to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // Handle token verification errors
    return res.status(401).send({ message: 'Invalid token' });
  }
};

export default verifyToken;