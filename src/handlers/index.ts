import init from "./contract/init";
import mint from "./nft/mint";
import transfer from "./nft/transfer";
import burn from "./nft/burn";
import bid from "./market/bid";

import { JSONValue, log } from "@graphprotocol/graph-ts";
import { assert_json } from "../utils/assert";
import remove_bid from "./market/remove_bid";
import accept_bid from "./market/accept_bid";

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

  if (eventName == "nft_burn") {
    burn(eventData, info);
    return;
  }

  if (eventName == "nft_transfer") {
    transfer(eventData, info);
    return;
  }

  if (eventName == "nft_bid") {
    bid(eventData, info);
    return;
  }

  if (eventName == "nft_remove_bid") {
    remove_bid(eventData, info);
    return;
  }

  if (eventName == "nft_accept_bid") {
    accept_bid(eventData, info);
    return;
  }

  // If event name is unknown
  log.warning("Unhandled event: {}, Contract Adress: {}", [
    eventName,
    info.get("contract"),
  ]);
}
