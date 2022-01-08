import handleMint from "./NFT/mint";
import handleTransfer from "./NFT/transfer";
import handleBurn from "./NFT/burn";

import { log } from "@graphprotocol/graph-ts";

export function handleMethod(methodName: string): void {
  if (methodName == "claim_media") {
    handleMint();
  } else if (methodName == "burn") {
    handleBurn();
  } else if (methodName == "transfer") {
    handleTransfer();
  } else {
    log.error("Unhandled smart contract method: {}", [methodName]);
  }
}
