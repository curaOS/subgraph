import init from "./init";
import mint from "./mint";
import transfer from "./transfer";
import burn from "./burn";

import { JSONValue, log } from "@graphprotocol/graph-ts";
import { assert_json_object } from "../utils/assert";

export function handleEvent(event: JSONValue, contractAdress: string): void {
  if (!assert_json_object(event, "logs.event")) return;

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
  if (!assert_json_object(eventData, "logs.event.data")) return;

  log.info("Event triggered: {}, Contract Adress: {}", [
    eventName,
    contractAdress,
  ]);

  if (eventName == "init") {
    init(eventData, contractAdress);
    return;
  }

  if (eventName == "nft_mint") {
    mint(eventData, contractAdress);
    return;
  }

  if (eventName == "burn") {
    burn();
    return;
  }

  if (eventName == "transfer") {
    transfer();
    return;
  }

  // If event name is unknown
  log.warning("Unhandled event: {}, Contract Adress: {}", [
    eventName,
    contractAdress,
  ]);
}
