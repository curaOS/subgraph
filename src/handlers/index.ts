import init from "./init";
import mint from "./mint";
import transfer from "./transfer";
import burn from "./burn";

import { JSONValue, log } from "@graphprotocol/graph-ts";
import { assert_json } from "../utils/assert";

export function handleEvent(event: JSONValue, info: Map<string, string>): void {
  if (!assert_json(event, "object", "logs.event")) return;

  // Get the event name
  const eventName = event
    .toObject()
    .get("event")!
    .toString();

  // Get the event data
  const eventData = event
    .toObject()
    .get("data")!
    .toArray()[0];
  if (!assert_json(eventData, "object", "logs.event.data")) return;

  log.info("Event triggered: {}, Contract Adress: {}", [
    eventName,
    info.get("contract"),
  ]);

  if (eventName == "nft_init") {
    init(eventData, info);
    return;
  }

  if (eventName == "nft_mint") {
    mint(eventData, info);
    return;
  }

  if (eventName == "burn") {
    burn(eventData, info);
    return;
  }

  if (eventName == "transfer") {
    transfer(eventData, info);
    return;
  }

  // If event name is unknown
  log.warning("Unhandled event: {}, Contract Adress: {}", [
    eventName,
    info.get("contract"),
  ]);
}
