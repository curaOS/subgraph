import {
  JSONValue,
  log,
  TypedMap,
  TypedMapEntry,
} from "@graphprotocol/graph-ts";
import { Nft, NftContract } from "../../generated/schema";

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

  // log.warning(`logs.event.data = {}`, [tokenMetadata.get("title")!.toString()]);
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
    if ((entries[i].key = "id")) {
      id = entries[i].value.toString();
    }
    if ((entries[i].key = "metadata")) {
      metadata = entries[i].value.toObject().entries;
    }
    if ((entries[i].key = "owner_id")) {
      owner = entries[i].value.toString();
    }
    if ((entries[i].key = "creator_id")) {
      creator = entries[i].value.toString();
    }
    if ((entries[i].key = "prev_owner_id")) {
      prev_owner = entries[i].value.toString();
    }
  }

  // create a new Nft entity with the same id from NEAR
  const nft = new Nft(`${id}`);

  // Metadata
  for (let i = 0; i < metadata.length; i++) {
    if (metadata[i].key == "title") {
      nft.title = metadata[i].value.toString();
    }
    if (metadata[i].key == "description") {
      nft.description = metadata[i].value.toString();
    }
    if (metadata[i].key == "media") {
      nft.media = metadata[i].value.toString();
    }
    if (metadata[i].key == "copies") {
      nft.copies = metadata[i].value.toBigInt();
    }
    if (metadata[i].key == "extra") {
      nft.extra = metadata[i].value.toString();
    }
    if (metadata[i].key == "reference") {
      nft.reference = metadata[i].value.toString();
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
