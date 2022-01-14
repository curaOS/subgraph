import { json, JSONValue, JSONValueKind, log } from "@graphprotocol/graph-ts";
import { NFT, NFTContract } from "../../../generated/schema";
import { assert_json_object } from "../../utils/assert";
import { stringifyJson } from "../../utils/debug";

export default function mint(
  event_data: JSONValue,
  contractAdress: string
): void {
  const tokens = event_data
    .toObject()
    .get("tokens")!
    .toArray();

  const token = tokens[0].toObject();
  const tokenMetadata = token.get("metadata")!.toObject();

  // log.warning(`logs.event.data = {}`, [tokenMetadata.get("title")!.toString()]);

  let nft = new NFT(`${token.get("id")!.toString()}`);

  const entries = tokenMetadata.entries;

  for (let i = 0; i < entries.length; i++) {
    let e = entries[i];
    if (e.key == "title") {
      nft.title = e.value.toString();
    }
    if (e.key == "description") {
      nft.description = e.value.toString();
    }
    if (e.key == "media") {
      nft.media = e.value.toString();
    }
    if (e.key == "copies") {
      nft.copies = e.value.toBigInt();
    }
  }

  nft.save();
}
