import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import elipseImage1 from "../assets/Images/Ellipse1.png";
import elipseImage2 from "../assets/Images/Ellipse 2.png";
import elipseImage3 from "../assets/Images/Ellipse 3.png";

const Home = () => {
  return (
    <div>
      {/* {section-> 1 } */}

      <div className="relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white gap-[30px]">
        <Link to={"/signup"}>
          <div
            className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit shadow-md shadow-pure-greys-500"
          >
            <div
              className="flex flex-row items-center gap-2 rounded-full px-8 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900 text-xs"
            >
              <p>Beacome an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7 flex space-x-2">
          <h1>Empower Your Future with</h1>
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="text-center text-richblack-300 mt-5 width-[90%] text-[16px] font-medium font-inter leading-6 self-stretch">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors
        </div>

        <div className="flex flex-row mt-5 gap-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book A Demo
          </CTAButton>
        </div>

        <div className='mx-3 my-12  -z-10s relative vid1'>
                    <div > 
                        <img src = {elipseImage2} width={"100%"}
                        className='absolute bottom-[1%] -z-10 ' 
                        alt='elipse ' />
                        <img src = {elipseImage1} width={"100%"}
                        className='absolute right-[12%] top-[2%] -z-10'
                        alt='elipse ' />
                        
                    </div>
                    <video muted loop autoPlay >
                        <source  src={Banner} type="video/mp4" />
                    </video> 
                    
                </div>

        {/* code section1  */}

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={" Coding Potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            }
            ctabtn1={{
              linkto: "/signup",
              active: true,
              btnText: "Try it Yourself",
            }}
            ctabtn2={{
              linkto: "/login",
              active: false,
              btnText: "Learn More",
            }}
            codeblock={[
              `<!DOCTYPE html>`,
              `<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>`,
              `h1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`,
            ]}
            codeColor={"text-yellow-25"}
            backgroudGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* code section2  */}

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={" Coding Potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            }
            ctabtn1={{
              linkto: "/signup",
              active: true,
              btnText: "Try it Yourself",
            }}
            ctabtn2={{
              linkto: "/login",
              active: false,
              btnText: "Learn More",
            }}
            codeblock={[
              `<!DOCTYPE html>`,
              `<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>`,
              `h1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`,
            ]}
            codeColor={"text-yellow-25"}
            backgroudGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>
      </div>

      {/* {section-> 2 } */}

      {/* {section-> 3 } */}

      {/* {Footer } */}
    </div>
  );
};

export default Home;
