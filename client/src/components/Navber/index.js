import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ connect, address }) => {
  return (
    <div className="nav-container">
      <div className="left">
        <span>logo</span>
        <span>Warr</span>
      </div>
      <div className="right">
        <span>{address === "" ? "" : address}</span>
        <button className="connect" onClick={connect}>
          Connect Wallet
        </button>
        <Link to="/business">Switch to Selling</Link>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
