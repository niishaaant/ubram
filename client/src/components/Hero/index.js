import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ address }) => {
  return (
    <div className="hero-container">
      {address === "" ? (
        "Welcome, please ligin with your wallet."
      ) : (
        <div>
          <Link to="/inventory">Invantory</Link>
          <button>Posts</button>
        </div>
      )}
    </div>
  );
};

export default Hero;
