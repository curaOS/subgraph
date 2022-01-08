import { log } from "@graphprotocol/graph-ts";

export default function handleMint(): void {
  log.error("Method called: {}", ["mint"]);
}
