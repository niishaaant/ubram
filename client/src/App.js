import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navber";
import Hero from "./components/Hero";
import { ethers } from "ethers";
import { client, getProfile } from "./components/utils/API";
import "./app.scss";
import Inventory from "./components/Inventory";
import Selling from "./components/Selling";

const App = () => {
  const [userAddress, setUserAddress] = useState("");
  const [showNetworkPopup, setShowNetworkPopup] = useState(false);
  const NFTMangerAddress = "0x927EE3455da06A07c170Cf591D2b6EEf75De7bA4";
  // Button handler button for handling a
  // request event for metamask
  const connectHandler = async () => {
    // Asking if metamask is already present or not
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const network = await provider.getNetwork();
      if (network.chainId !== 80001) {
        setShowNetworkPopup(true);
        return;
      }
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();

      const response = await client
        .query(getProfile, { signerAddress })
        .toPromise();

      console.log(response.data);

      setUserAddress(signerAddress);
    } else {
      alert("install metamask extension!!");
    }
  };

  return (
    <div>
      <Navbar connect={connectHandler} address={userAddress} />
      <Routes>
        <Route
          path="/"
          element={
            <Hero showNetworkPopup={showNetworkPopup} address={userAddress} />
          }
        />
        <Route
          path="/inventory"
          element={<Inventory managerAddress={NFTMangerAddress} />}
        />
        <Route path="/business" element={<Selling />} />
      </Routes>
    </div>
  );
};

export default App;
