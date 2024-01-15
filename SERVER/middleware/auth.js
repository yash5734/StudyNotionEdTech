const User = require("../model/User");
const jwt = require("jsonwebtoken")
require("dotenv").config();


//auth
exports.auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", "");

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token not found",
            })
        }

        // verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("auth middleware user decode", decode);
            req.user = decode;
        } catch (error) {
            console.log("error occured while verify token", error);
        }
        next();

    } catch (error) {
        console.log("error occured in auth middleware: ", error);
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

//isStudent

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType != 'Student') {
            return res.status(400).json({
                success: false,
                message: "This route is protected for Student only",
            })
        }
        next();
    } catch (error) {
        console.log("error occured in isStudent middleware: ", error);
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

//isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        console.log(req.user.accountType)
        if (req.user.accountType != 'Instructor') {
            return res.status(400).json({
                success: false,
                message: "This route is protected for Instructor only",
            })
        }
        next();
    } catch (error) {
        console.log("error occured in isInstructor middleware: ", error);
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType != 'Admin') {
            return res.status(400).json({
                success: false,
                message: "This route is protected for Admin only",
            })
        }
        next();
    } catch (error) {
        console.log("error occured in isAdmin middleware: ", error);
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}