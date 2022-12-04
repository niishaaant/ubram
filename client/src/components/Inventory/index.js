import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./inventory.scss";
import ManagerABI from "../utils/ManagerABI.json";
import TokenABI from "../utils/TokenABI.json";

const Inventory = ({ managerAddress }) => {
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const fetchAllNFT = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const tokenManager = new ethers.Contract(
      managerAddress,
      ManagerABI,
      signer
    );
    console.log(tokenManager);
    const NFTs = await tokenManager.getAllTokens();
    NFTs.map(async (e) => {
      const NFT = new ethers.Contract(e, TokenABI, signer);
      const balance = Number(await NFT.balanceOf(signerAddress));
      if (balance > 0) {
        const arr = ownedNFTs;
        arr.push({
          address: e,
          tokenURI: (await NFT.tokenURI(1)).toString(),
          balance: balance,
          name: (await NFT.name()).toString(),
        });
        setOwnedNFTs(arr);
        console.log(ownedNFTs);
      }
    });
  };
  useEffect(() => {
    fetchAllNFT();
  }, []);
  return (
    <div className="inventory-container">
      <div>
        {/*user details*/}
        <div>UserName: niishaaant</div>
        <div>Followers: _ Following: _</div>
        <div>
          {/*user NFTS*/}
          {ownedNFTs.length === 0 &&
            ownedNFTs.map((e, i) => <Item content={e} key={i} />)}
        </div>
      </div>
    </div>
  );
};

const Item = ({ content }) => {
  return (
    <div>
      {/*user NFT*/}
      <div>{content.name}</div>
      <div>{content.tokenURI}</div>
      <div>{content.balance}</div>
    </div>
  );
};

export default Inventory;
