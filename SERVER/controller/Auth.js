const User = require("../model/User");
const OTP = require("../model/OTP");
const Profile = require("../model/Profile");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
// const otpGenerator = require("otp-generator");

require("dotenv").config();

exports.sendOtp = async (req, res) => {
    try {
        //1st STEP => fetching... eamil from req.body
        const { email } = req.body;

        //check if user already present..
        const checkUserPresent = await User.findOne({ email });
        //if user is already present
        if (checkUserPresent) {
            return res.status(401).json({
                sucess: false,
                message: "User Already Exists",
            })
        }

        //genearating... otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP GENERATED => ", otp);

        //checking... uniqueness of the oTP
        // let result = await OTP.findOne({otp: otp});

        // while(result){
        //     otp = otpGenerator.generate(6, { //CHECK THIS IF ERROR OCURR 
        //         upperCaseAlphabets:false,
        //         lowerCaseAlphabets:false,
        //         specialChars:false,
        //     });

        //     result = await OTP.findOne({otp: otp});
        // }

        const result = await OTP.findOne({ otp });
        // console.log("Result is Generate OTP Func");
        console.log("--------------OTP-------------", otp);
        console.log("Result", result);
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
        }

        //creating... otpPayload
        const otpPayload = { email, otp };
        //creating... an entry in Database for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log("otpBODY -> ", otpBody);

        //sending...final response
        res.status(200).json({
            success: true,
            message: "OTP Sended SUCCESSFULLY !!",
            otp: otp,
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}
// signup

exports.signUp = async (req, res) => {
    try {
        // Destructure fields from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;
        // Check if All Details are there or not
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp
        ) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Password and Confirm Password do not match. Please try again.",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }

        // Find the most recent OTP for the email
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        // const response = await OTP.find({ email }).sort({ createdAt: -1 });
        console.log(response);
        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP you entered is wrong !!",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};

// login

exports.login = async (req, res) => {
    try {

        // fetch data for req;
        const { email, password } = req.body;

        // check email and password
        if (!email || !password) {
            return res.status(501).json({
                success: false,
                message: "All fields are required",
            })
        }
        // validate user;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not exists, Please register youself",
            })
        }
        // compare password & CREATE token

        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            // add token in user
            user.token = token;
            user.password = undefined; // we remove the password bcz od security as we would not send the essential details in response like password, as we are not saving the user so in our database password is not removed. if we user user.save() then in our database password in upadted as undefine.

            // create cokkie and send response
            const options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(201).json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Your password is incorrect",
            })
        }

    } catch (error) {
        console.log("error occured while login", error);
        return res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}


exports.changePassword = async (req, res) => {
    try {
        // fetch details;
        const { email, password, newPassword, confirmPassword } = req.body;

        if (!email || !password || !confirmPassword || !newPassword) {
            return res.status(501).json({
                success: false,
                message: "All fields are required",
            })
        }

        // check user exits
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not exists, Please register youself",
            })
        }

        // check old password
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Your previous password is incorrect",
            })
        }

        // check new password

        if (newPassword !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Enter coorect new password",
            })
        }

        // hashed new password
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        // update new password
        user.password = newHashedPassword;
        await user.save();

        // send email for password changed
        try {
            const mailResponse = await mailSender(email, "Update Password", "Your password is successfully Changed!")
            console.log("email of changing password is sent", mailResponse);
        } catch (error) {
            console.log("error occured while sending mail for changing password", error);
        }


        return res.status(201).json({
            success: true,
            message: "User passord has changed",
        })
    } catch (error) {
        console.log("error occured while changing password", error);
        return res.status(401).json({
            success: false,
            message: error.message,
        })
    }

}