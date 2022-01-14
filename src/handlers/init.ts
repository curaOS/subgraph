import {
  JSONValue,
  log,
  TypedMap,
  TypedMapEntry,
} from "@graphprotocol/graph-ts";
import { NftContract } from "../../generated/schema";

export default function init(
  event_data: JSONValue,
  contractAdress: string
): void {}

function save_contract(token: JSONValue, contractAdress: string): void {}
