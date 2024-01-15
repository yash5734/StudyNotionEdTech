const User = require("../model/User");
const Course = require("../model/Course");
const Category = require("../model/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create course

exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, category, tag } = req.body;
        const thumbnail = req.files.thumbnailImage;

        if (!courseName || !courseDescription || !whatYouWillLearn || !category || !price || !thumbnail || !tag) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const userID = req.user.id;

        // Check if the user is an instructor
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "Not a valid instructor ID while creating a course",
            });
        }

        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(400).json({
                success: false,
                message: "Not a valid category ID while creating a course",
            });
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: userID,
            whatYouWillLearn,
            price,
            tag,
            thumbnail: thumbnailImage.secure_url,
            category: categoryDetails._id,
        });

        await User.findByIdAndUpdate(userID, { $push: { courses: newCourse._id } });

        await Category.findByIdAndUpdate(category, { $push: { course: newCourse._id } });

        return res.status(201).json({
            success: true,
            message: "Course is successfully created",
            data: newCourse,
        });
    } catch (error) {
        console.error("Error occurred while creating a course", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// show all courses

exports.getAllCourses = async (req, res) => {
    try {
        // fetch data from db with name and decription
        const allCourses = await Course.find({},
            {
                courseName: true,
                courseDescription: true,
                instructor: true,
                ratingAndReviews: true,
                thumbnail: true,
                studentsEnrolled: true,
            }
        ).populate("instructor").populate("tag").exec();
        // return the data
        return res.status(201).json({
            success: true,
            message: "All Courses Returned Successfully",
            data: allCourses,
        })
    } catch (error) {
        console.log("error occured while showing all the courses", error);
        return res.status(501).json({
            success: false,
            message: error.message,
        })
    }
}

// hw - get course details all populated

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const courseDetails = await Course.find({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                }
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                }
            })
            // .populate({
            //     path: "ratingAndReviews",
            //     populate: {
            //         path: "user",
            //     }
            // })
            .populate("category")
            .populate("studentsEnrolled")
        console.log(courseDetails);

        if (!courseDetails) {
            return res.status(401).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
            })
        }
        return res.status(201).json({
            success: true,
            message: "Course details fetch successfully",
            data: courseDetails,
        })


    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}
