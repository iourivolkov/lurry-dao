import ethers from "ethers";

// import and config .env file
import dotenv from "dotenv";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
dotenv.config();

// make sure .env works
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
  console.log("Private key not found!");
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === "") {
  console.log("Alchemy API URL not found!");
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
  console.log("Wallet Address not found!");
}

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // wallet private key
    process.env.PRIVATE_KEY,
    // RPC URL - use Alchemy API URL
    ethers.getDefaultProvider(
      `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_URL}`
    )
  )
);

(async () => {
  try {
    const address = await sdk.getSigner().getAddress();
    console.log("SDK initialized by address:", address);
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})();

// export initialized thirdweb SDK to use in other scripts
export default sdk;
