const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
try {

    console.log("========== AUTH START ==========");

    const authHeader = req.headers.authorization;

    console.log("Authorization Header:");
    console.log(authHeader);

    if (!authHeader) {
    return res.status(401).json({
        success: false,
        message: "Authorization header missing"
    });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:");
    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:");
    console.log(decoded);

    const user = await User.findById(decoded.id).select("-password");

    console.log("MongoDB User:");
    console.log(user);

    if (!user) {
    return res.status(404).json({
        success: false,
        message: "User not found"
    });
    }

    req.user = user;

    console.log("========== AUTH SUCCESS ==========");

    next();

} catch (error) {

    console.log("========== AUTH ERROR ==========");
    console.log(error);

    return res.status(401).json({
    success: false,
    message: error.message
    });

}
};

module.exports = protect;