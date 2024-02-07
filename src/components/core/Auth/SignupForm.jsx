import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    confirmPassword: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType,setAccountType] = useState("student")
  function changeHandler(event) {
    return setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  function submitHandler(event) {
    event.preventDefault()
  }
  return (
    <div>
      {/* student and instructor button  */}
      <div className="flex flex-row bg-richblack-800 rounded-full max-w-max gap-x-1 my-6 p-1">
        <button
          onClick={()=>setAccountType("student")}
          className={`${accountType === "student" ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}>
          Student
        </button>
        <button
          onClick={()=>setAccountType("instructor")}
          className={`${accountType === "instructor" ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}>

          Instructor
        </button>
      </div>

      <form action="" onSubmit={submitHandler} className="flex flex-col w-full gap-y-5 mt-6">

        <div className="flex gap-x-3">
          <label>
            <p className="text-richblack-200 text-[0.875rem] leading-[1.375rem] mb-1">
              Enter First Name <sup className="text-pink-200 ">*</sup>{" "}
            </p>
            <input
              required
              type="text"
              placeholder="Enter the First Name"
              value={formData.firstName}
              name="firstName"
              className="p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5 w-full"
            />
          </label>
          <label>
            <p  className="text-richblack-200 text-[0.875rem] leading-[1.375rem] mb-1">
              Enter Last Name <sup className="text-pink-200 ">*</sup>{" "}
            </p>
            <input
              required
              type="text"
              placeholder="Enter the Last Name"
              value={formData.lastName}
              name="lastName"
              className="p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5 w-full"
            />
          </label>
        </div>

        <label>
          <p  className="text-richblack-200 text-[0.875rem] leading-[1.375rem] mb-1">
            Enter Your Email Address <sup className="text-pink-200 ">*</sup>
          </p>
          <input
            type="email"
            required
            value={formData.email}
            name="email"
            placeholder="Enter Your Email Address"
            onChange={changeHandler}
            className="p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5 w-full"
          />
        </label>


        <div className="flex gap-x-3">
          <label className="relative">
            <p  className="text-richblack-200 text-[0.875rem] leading-[1.375rem] mb-1">
              Enter Password <sup className="text-pink-200 ">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              name="password"
              placeholder="Enter Password"
              onChange={changeHandler}
              className="p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5 w-full"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2Bf"/> : <AiOutlineEye fontSize={24} fill="#AFB2Bf" />}
            </span>
          </label>

          <label className="relative">
            <p  className="text-richblack-200 text-[0.875rem] leading-[1.375rem] mb-1"> 
              Enter Password <sup className="text-pink-200 ">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              name="confirmPassword"
              placeholder="Enter Password"
              onChange={changeHandler}
              className="p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5 w-full"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2Bf" /> : <AiOutlineEye fontSize={24} fill="#AFB2Bf"/>}
            </span>
          </label>
        </div>

        <button  className="px-[12px] py-[8px] bg-yellow-50 text-richblack-900 rounded-[8px] font-medium mt-6">
          Create Account
        </button>
        
      </form>
    </div>
  );
};

export default SignupForm;
