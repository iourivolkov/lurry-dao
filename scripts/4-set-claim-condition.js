import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

// address = ERC1155's contract address (same as module 3)
const editionDrop = sdk.getEditionDrop(
  "0xEB97ee0Ad858E688CaD12C67f728Df3a6AA3BC99"
);

(async () => {
  try {
    // define claim conditions - array of objects b/c can have multiple phases starting @ diff times
    const claimConditions = [
      {
        // when people can start minting / claiming NFTs
        startTime: new Date(),
        // max num of NFTs that can be claimed
        maxQuantity: 100,
        // the price of NFT
        price: 0,
        // amount of NFTs people can claim per one tx
        quantityLimitPerTransaction: 1,
        // set wait b/w tx's to MaxUint256 -> people can only claim once
        waitInSeconds: MaxUint256,
      },
    ];

    // interacts w/ our deployed contract on-chain and adjusts the conditions
    // pass in 0 b/c membership NFT has tokenId of 0 (1st one) -> everyone mints same NFT w/ id = 0
    // can have multiple "tiers" of NFTs -> e.g tokenId = 0, 1 etc.
    await editionDrop.claimConditions.set("0", claimConditions);
    console.log("Successfully set claim condition!");
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})();
