import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";
import { errorMonitor } from "node:events";

// access editionDrop contract
// address printed out when editionDrop contract deployed in module 2
const editionDrop = sdk.getEditionDrop(
  "0xEB97ee0Ad858E688CaD12C67f728Df3a6AA3BC99"
);

(async () => {
  try {
    // set up NFT on ERC1155 using createBatch
    // set up props => name, desc, image
    await editionDrop.createBatch([
      {
        name: "OG Lurry",
        description: "Your key to LurryDAO",
        image: readFileSync("scripts/assets/originalLurry.png"),
      },
    ]);
    console.log("Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("Failed to create the new NFT", errorMonitor);
  }
})();
