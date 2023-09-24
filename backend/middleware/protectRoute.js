import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


const protectRoute = async (req, res, next) => {
    try {
        //take the cookie
        const token = req.cookies.jwt;

        if (!token) return res.status(401).json({ message: "Unauthorized" });
        //verify the token is valid or not
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        //set the user obj to user before going to the nxt req;
        req.user = user;

        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in signupUser: ", err.message);
    }
};

export default protectRoute;