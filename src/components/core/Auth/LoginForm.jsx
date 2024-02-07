import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
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
    <form action="" onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
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
      <label className="w-full">
        <p className="text-richblack-200 text-[0.875rem] leading-[1.375rem] mb-1">
          Email Address <sup className="text-pink-200 ">*</sup>
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
      <label className="w-full relative">
        <p className="text-richblack-200 text-[0.875rem] leading-[1.375rem] mb-1">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          type={showPassword ? "text" : "password"}
          required
          value={formData.password}
          name="password"
          placeholder="Enter Your Password"
          onChange={changeHandler}
          className="p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5 w-full"
        />

        {/* setShowPassword((prev)=> !prev) */}
        <span className="absolute right-3 top-[38px] cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2Bf"/> : <AiOutlineEye fontSize={24} fill="#AFB2Bf" />}
        </span>

        <Link to="#">
          <p  className="text-blue-100 max-w-max ml-auto text-xs mt-1 ">Forgot Password</p>
        </Link>
      </label>
      <button className="px-[12px] py-[8px] bg-yellow-50 text-richblack-900 rounded-[8px] font-medium mt-6">
        Sign in 
      </button>
    </form>
  );
};

export default LoginForm;
