import image from "../botimage.jpg";
import "./landing.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
export default function LandingPage() {
  return (
    <>
      <div className="w3-top">
        <div className="w3-bar" id="myNavbar">
          <Link to={"/login"} className="w3-bar-item w3-button">
            {" "}
            <i className="fa fa-user"></i> LOGIN
          </Link>
          <Link to={"/signup"} className="w3-bar-item w3-button">
            {" "}
            <i className="fa fa-user"></i> SIGNUP
          </Link>
        </div>

        <div
          id="navDemo"
          className="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium"
        >
          <a href="#about" className="w3-bar-item w3-button">
            ABOUT
          </a>
          <Link to={"/login"} className="w3-bar-item w3-button">
            {" "}
            <i className="fa fa-user"></i> LOGIN
          </Link>
          <Link to={"/signup"} className="w3-bar-item w3-button">
            {" "}
            <i className="fa fa-user"></i> SIGNUP
          </Link>
        </div>
      </div>

      <div
        className="bgimg-1 w3-display-container w3-opacity-min"
        id="home"
        style={{ backgroundImage: `url(${image})`, minHeight: "100vh " }}
      >
        <div className="w3-display-middle">
          <span className="w3-center w3-padding-large w3-black w3-xlarge w3-wide w3-animate-opacity">
            <span className="w3-hide-small">ASSISTOR</span>
          </span>
        </div>
      </div>

      <div className="my-16 max-w-6xl mx-auto">
        <div className="flex justify-center items-center mb-10">
          <h2 className="text-5xl font-bold text-center text-blue-700">
            ABOUT THE CHATBOT:
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/2 text-center">
            <img
              className="w-96 h-96 rounded-full mx-auto mb-10"
              src="https://netpes.net/ADMIN/chatbot.png"
              alt="Chatbot Image"
            />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <p className="text-lg leading-9 text-gray-700 mb-8">
              <em>Assistor for the rescue</em>
            </p>
            <p className="text-xl leading-9 text-gray-800 mb-8">
              I've developed a unique chatbot that has received praise for its
              innovative approach to automation. Unlike many chatbots that rely
              on AI algorithms, this programmer used a rules-based system to
              program the chatbot's responses. This allowed them to create a
              highly customized and tailored experience for users, making the
              chatbot an excellent tool for specific industries or tasks. The
              chatbot's ability to understand and respond to user inputs in
              real-time has impressed many, and its success is a testament to
              the programmer's expertise in scripting and coding. With its
              user-friendly interface and efficient performance, this chatbot is
              poised to make a lasting impact in its field.
            </p>
          </div>
        </div>
      </div>

      <div className="fixed width-100 bottom-0 bg-gray-800 text-gray-300">
        <div className="text-sm">
          <a
            href="https://netpes.net"
            className="text-gray-300 hover:text-white"
          >
            Netpes Systems
          </a>
        </div>
      </div>
    </>
  );
}
