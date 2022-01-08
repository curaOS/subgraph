import { log } from "@graphprotocol/graph-ts";

export default function handleTransfer(): void {
  log.error("Method called: {}", ["transfer"]);
}
