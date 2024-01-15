const Profile = require("../model/Profile");
const User = require("../model/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not valid",
            })
        }
        await Profile.findByIdAndDelete({ _id: user.additionalDetails });
        //TODO HW : unenroll user form all enroll courses
        // for (const courseId of user.courses) {
        //     await Course.findByIdAndUpdate(
        //       courseId,
        //       { $pull: { studentsEnroled: id } },
        //       { new: true }
        //     )
        //   }
        await User.findByIdAndDelete({ _id: id });
        return res.status(201).json({
            success: true,
            message: "User is Successfully deleted",
        })

    } catch (error) {
        console.log("error occured while deleting User: ", error)
        return res.status(501).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {

      const { id } = req.user;
      console.log(id)

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Users Details Does not exits"
            })
        }

        const usersDetails = await User.findById({ _id: id }).populate("additionalDetails").exec();
        console.log(usersDetails)
        return res.status(200).json({
            success: true,
            message: "User details Fetch Successfully",
            data: usersDetails
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            messsage: "An Error has occured while getting the details"
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    // Validate input
    if (!displayPicture || !userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
      });
    }

    // Upload image to Cloudinary
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    // Check if the image upload was successful
    if (!image || !image.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image to Cloudinary",
      });
    }

    // Check if the user exists before updating the profile
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user profile with the new image URL
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );

    res.send({
      success: true,
      message: "Image updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


exports.updateProfile = async (req, res) => {
    try {
      const {
        firstName ,
        lastName ,
        dateOfBirth = "",
        about = "",
        contactNumber = "",
        gender = "",
      } = req.body
      const id = req.user.id
  
      // Find the profile by id
      const userDetails = await User.findById(id)
      const profile = await Profile.findById(userDetails.additionalDetails)
  
      const user = await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
       
      })
      await user.save()
  
      // Update the profile fields
      profile.dateOfBirth = dateOfBirth
      profile.about = about
      profile.contactNumber = contactNumber
      profile.gender = gender
  
      // Save the updated profile
      await profile.save()
  
      // Find the updated user details
      const updatedUserDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()
  
      return res.json({
        success: true,
        message: "Profile updated successfully",
        updatedUserDetails,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        error: error.message,
      })
    }
  }