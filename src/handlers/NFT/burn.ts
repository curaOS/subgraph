import { log } from "@graphprotocol/graph-ts";

export default function handleBurn(): void {
  log.error("Method called: {}", ["burn"]);
}
