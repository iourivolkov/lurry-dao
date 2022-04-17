import { useAddress, useMetamask, useEditionDrop } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

const App = () => {
  // use hooks provided by third-web sdk
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("Address:", address);

  // initialize editionDrop contract
  const editionDrop = useEditionDrop(
    "0xEB97ee0Ad858E688CaD12C67f728Df3a6AA3BC99"
  );
  // state variable for us to know if user has our NFT
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  useEffect(() => {
    // if user doesn't have a connected wallet - exit
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        // check if user has our NFT - will query our deployed smart contract for the data
        // 0 = tokenId of NFT
        // asking contract - "does this user own a token w/ id = 0?"
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("Quack Quack! This user has a LurryDAO NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log(
            "This user doesn't have a LurryDAO NFT - they're def #ngmi"
          );
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Faled to get balance", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  // case 1 - user hasn't connected their wallet - call connectWallet
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to LurryDAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect Wallet
        </button>
      </div>
    );
  }

  // case 2 - have user's address - means user connected wallet to our site
  return (
    <div className="landing">
      <h1>Wallet Connected!</h1>
    </div>
  );
};

export default App;
