import { BigInt, JSONValue, log, TypedMapEntry } from "@graphprotocol/graph-ts";
import {
  User,
  Activity,
  Nft,
  NftContract,
  NftMetadata,
} from "../../../generated/schema";
import { assert_json } from "../../utils/assert";

export default function mint(
  event_data: JSONValue,
  info: Map<string, string>
): void {
  // get contract entity from The Graph store
  const contractAddress = info.get("contract");
  const contract = NftContract.load(contractAddress);

  // if the contract is not indexed
  if (!contract) {
    log.error("Invalid contract: {} is not indexed", [contractAddress]);
    return;
  }

  // get nfts array from "data.tokens"
  const nfts = event_data
    .toObject()
    .get("tokens")!
    .toArray();

  // for each nfts
  for (let i = 0; i < nfts.length; i++) {
    // save nft
    const nft = save_nft(nfts[i], contractAddress);
    // save activity
    if (nft != null) {
      save_metadata(nfts[i]);
      save_activity(nft, info);
      update_user(nft.owner);
      update_contract(contract);
    }
  }
}

function save_nft(token: JSONValue, contractAddress: string): Nft | null {
  // nft id is required or indexing will be skiped
  const tokenId = token.toObject().get("id")!;
  if (!assert_json(tokenId, "string", "mint.save_nft.id")) return null;

  // new Nft entity
  const nft = new Nft(`${tokenId.toString()}`);
  nft.contract = contractAddress;

  // map token object
  const entries = token.toObject().entries;

  for (let i = 0; i < entries.length; i++) {
    const key = entries[i].key;
    const value = entries[i].value;

    switch (true) {
      case key == "owner_id":
        // owner is required
        if (!assert_json(value, "string", "mint.save_nft.owner")) return null;
        nft.owner = value.toString();
      case key == "creator":
        // creator is required
        if (!assert_json(value, "string", "mint.save_nft.creator")) return null;
        nft.creator = value.toString();
      case key == "prev_owner":
        // prev_owner is optional
        nft.prev_owner = assert_json(
          value,
          "string",
          "mint.save_nft.prev_owner"
        )
          ? value.toString()
          : nft.owner;
      case key == "royalty":
        // royalty is optional
        var royalty = assert_json(value, "object", "mint.save_nft.royalty")
          ? value.toObject()
          : null;
    }
  }

  /** @todo add royalty indexing */
  if (royalty) {
  }

  nft.save();
  return nft;
}

function save_metadata(token: JSONValue): NftMetadata | null {
  // map token object into variables
  const metadataObj = token.toObject().get("metadata")!;
  if (!assert_json(metadataObj, "object", "mint.save_metadata.metadata"))
    return null;

  const entries = metadataObj.toObject().entries;

  // nft id
  const tokenId = token
    .toObject()
    .get("id")!
    .toString();

  // new NftMetadata entity with tokenId as id
  const nftMetadata = new NftMetadata(`${tokenId}`);
  nftMetadata.nft = tokenId;

  for (let i = 0; i < entries.length; i++) {
    const key = entries[i].key;
    const value = entries[i].value;
    switch (true) {
      case key == "title":
        nftMetadata.title = assert_json(value, "string")
          ? value.toString()
          : "";
      case key == "description":
        nftMetadata.description = assert_json(value, "string")
          ? value.toString()
          : "";
      case key == "media":
        nftMetadata.media = assert_json(value, "string")
          ? value.toString()
          : "";
      case key == "media_hash":
        nftMetadata.media_hash = assert_json(value, "string")
          ? value.toString()
          : "";
      case key == "copies":
        nftMetadata.copies = assert_json(value, "number")
          ? (value.toU64() as i32)
          : 1;
      case key == "extra":
        nftMetadata.extra = assert_json(value, "string")
          ? value.toString()
          : "";
      case key == "reference":
        nftMetadata.reference = assert_json(value, "string")
          ? value.toString()
          : "";
      case key == "reference_hash":
        nftMetadata.reference_hash = assert_json(value, "string")
          ? value.toString()
          : "";
      case key == "issued_at":
        nftMetadata.issued_at = assert_json(value, "string")
          ? value.toString()
          : "";
      case key == "starts_at":
        nftMetadata.starts_at = assert_json(value, "string")
          ? value.toString()
          : "";
      case key == "updated_at":
        nftMetadata.updated_at = assert_json(value, "string")
          ? value.toString()
          : "";
      case key == "expires_at":
        nftMetadata.expires_at = assert_json(value, "string")
          ? value.toString()
          : "";
    }
  }

  nftMetadata.save();
  return nftMetadata;
}

function save_activity(nft: Nft, info: Map<string, string>): Activity {
  const id = `${nft.id}/${info.get("timestamp")}`;

  const activity = new Activity(id);

  activity.nft = nft.id;
  activity.type = "mint";
  activity.timestamp = BigInt.fromString(info.get("timestamp"));

  activity.mintBy = nft.owner;

  activity.transactionHash = info.get("transactionHash");

  activity.save();
  return activity;
}

function update_user(address: string): void {
  let user = User.load(address);

  // if account doesn't exist save new account
  if (!user) {
    user = new User(address);
    user.total_owned = BigInt.zero();
    user.total_minted = BigInt.zero();
  }

  // add +1
  user.total_owned = user.total_owned.plus(BigInt.fromI32(1));
  user.total_minted = user.total_minted.plus(BigInt.fromI32(1));

  user.save();
}

function update_contract(contract: NftContract): void {
  // add +1
  contract.total_supply = contract.total_supply.plus(BigInt.fromI32(1));
  contract.save();
}
