import image from "../botimage.jpg";
import "./landing.css";
import { Link } from "react-router-dom";
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

      <div className="w3-content w3-container w3-padding-64" id="about">
        <h3 className="w3-center">ABOUT THE CHATBOT:</h3>
        <p className="w3-center">
          <em>Assistor for the rescue</em>
        </p>
        <p>
          I've developed a unique chatbot that has received praise for its
          innovative approach to automation. Unlike many chatbots that rely on
          AI algorithms, this programmer used a rules-based system to program
          the chatbot's responses. This allowed them to create a highly
          customized and tailored experience for users, making the chatbot an
          excellent tool for specific industries or tasks. The chatbot's ability
          to understand and respond to user inputs in real-time has impressed
          many, and its success is a testament to the programmer's expertise in
          scripting and coding. With its user-friendly interface and efficient
          performance, this chatbot is poised to make a lasting impact in its
          field.
        </p>
      </div>

      <div className="w3-row w3-center w3-dark-grey w3-padding-16 ">
        <div className="w3-third w3-section">
          <span className="w3-xlarge">14+</span>
          <br />
          Partners
        </div>
        <div className="w3-third w3-section">
          <span className="w3-xlarge">55+</span>
          <br />
          Projects Done
        </div>
        <div className="w3-third w3-section">
          <span className="w3-xlarge">89+</span>
          <br />
          Happy Clients
        </div>
      </div>
    </>
  );
}
