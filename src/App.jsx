import { useAddress, useMetamask } from "@thirdweb-dev/react";

const App = () => {
  // use hooks provided by third-web sdk
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("Address:", address);

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
