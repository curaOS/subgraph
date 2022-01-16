import {
  JSONValue,
  log,
  TypedMap,
  TypedMapEntry,
} from "@graphprotocol/graph-ts";
import { Nft, NftContract } from "../../generated/schema";
import { assert_json } from "../utils/assert";
import { stringifyJson } from "../utils/debug";

export default function mint(
  event_data: JSONValue,
  contractAdress: string
): void {
  // get contract entity from The Graph store
  const contract = NftContract.load(contractAdress);

  // if the contract is not indexed
  if (!contract) {
    log.error("Invalid contract: {} is not indexed", [contractAdress]);
    return;
  }

  // get nfts array from "data.tokens"
  const nfts = event_data
    .toObject()
    .get("tokens")!
    .toArray();

  // save each nfts to The Graph store
  for (let i = 0; i < nfts.length; i++) {
    save_nft(nfts[i], contractAdress);
  }
}

function save_nft(token: JSONValue, contractAdress: string): void {
  let id: string,
    metadata: TypedMapEntry<string, JSONValue>[],
    owner: string,
    creator: string,
    prev_owner: string;

  // map token object into variables
  const entries = token.toObject().entries;

  for (let i = 0; i < entries.length; i++) {
    if (entries[i].key == "id") {
      // Id is required or indexing fail
      if (!assert_json(entries[i].value, "string")) return;
      id = entries[i].value.toString();
    }
    if (entries[i].key == "metadata") {
      // metadata is required
      if (!assert_json(entries[i].value, "object")) return;
      metadata = entries[i].value.toObject().entries;
    }
    if (entries[i].key == "owner_id") {
      // owner is required
      if (!assert_json(entries[i].value, "string")) return;
      owner = entries[i].value.toString();
    }
    if (entries[i].key == "creator_id") {
      // creator is required
      if (!assert_json(entries[i].value, "string")) return;
      creator = entries[i].value.toString();
    }
    if (entries[i].key == "prev_owner_id") {
      // prev_owner is not required
      prev_owner = assert_json(entries[i].value, "string")
        ? entries[i].value.toString()
        : "";
    }
  }

  // create a new Nft entity with the same id from NEAR
  const nft = new Nft(`${id}`);

  // Metadata
  for (let i = 0; i < metadata.length; i++) {
    if (metadata[i].key == "title") {
      // not required
      nft.title = assert_json(metadata[i].value, "string")
        ? metadata[i].value.toString()
        : "";
    }
    if (metadata[i].key == "description") {
      // not required
      nft.description = assert_json(metadata[i].value, "string")
        ? metadata[i].value.toString()
        : "";
    }
    if (metadata[i].key == "media") {
      // media is required or indexing fail
      if (!assert_json(metadata[i].value, "string")) return;
      nft.media = metadata[i].value.toString();
    }
    if (metadata[i].key == "copies") {
      // not required
      nft.copies = assert_json(metadata[i].value, "number")
        ? metadata[i].value.toBigInt()
        : null;
    }
    if (metadata[i].key == "extra") {
      // not required
      nft.extra = assert_json(metadata[i].value, "string")
        ? metadata[i].value.toString()
        : "";
    }
    if (metadata[i].key == "reference") {
      // not required
      nft.reference = assert_json(metadata[i].value, "string")
        ? metadata[i].value.toString()
        : "";
    }
  }

  // Ownership
  nft.owner = owner;
  nft.creator = creator;
  nft.prev_owner = prev_owner;

  // Contract
  nft.contract = contractAdress;

  nft.save();
}
