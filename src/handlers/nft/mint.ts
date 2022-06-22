import { BigInt, JSONValue, log } from "@graphprotocol/graph-ts";
import {
  User,
  Activity,
  Nft,
  NftContract,
  NftMetadata,
} from "../../../generated/schema";
import { assert_json } from "../../utils/assert";
import { stringifyJson } from "../../utils/debug";

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

  const metadata = event_data
      .toObject()
      .get("metadata")!
      .toArray();

  // for each nfts
  for (let i = 0; i < nfts.length; i++) {
    // save nft
    const nft = save_nft(nfts[i], contractAddress);
    // save activity
    if (nft != null) {
      save_metadata(nfts[i], metadata[i]);
      save_activity(nft, info);
      update_user(nft.owner);
      update_contract(contract);
    }
  }
}

function save_nft(token: JSONValue, contractAddress: string): Nft | null {
  // nft id is required or indexing will be skipped
  const tokenId = token.toObject().get("token_id")!;
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
        break;
      case key == "creator_id":
        // creator is required
        if (!assert_json(value, "string", "mint.save_nft.creator_id")) return null;
        nft.creator = value.toString();
        break;
      case key == "prev_owner_id":
        // prev_owner is optional
        nft.prev_owner = assert_json(
            value,
            "string",
            "mint.save_nft.prev_owner_id"
        )
            ? value.toString()
            : nft.owner;
        break;
        /** @todo add royalty indexing */
        // case key == "royalty":
        //   // royalty is optional
        //   var royalty = assert_json(value, "object", "mint.save_nft.royalty")
        //     ? value.toObject()
        //     : null;
        //   break;
    }
  }

  nft.save();
  return nft;
}

function save_metadata(token: JSONValue, metadata: JSONValue): NftMetadata | null {
  const entries = metadata.toObject().entries;

  // nft id
  const tokenId = token
      .toObject()
      .get("token_id")!

  // new NftMetadata entity with tokenId as id
  const nftMetadata = new NftMetadata(`${tokenId.toString()}`);
  nftMetadata.nft = tokenId.toString();

  for (let i = 0; i < entries.length; i++) {
    const key = entries[i].key;
    const value = entries[i].value;
    switch (true) {
      case key == "title":
        nftMetadata.title = assert_json(value, "string", "save_metadata.title")
            ? value.toString()
            : "";
        break;

      case key == "description":
        nftMetadata.description = assert_json(value, "string", "save_metadata.description")
            ? value.toString()
            : "";
        break;

      case key == "media":
        nftMetadata.media = assert_json(value, "string", "save_metadata.media")
            ? value.toString()
            : "";
        break;

      case key == "media_animation":
        nftMetadata.media_animation = assert_json(value, "string", "save_metadata.media_animation")
            ? value.toString()
            : "";
        break;

      case key == "media_hash":
        nftMetadata.media_hash = assert_json(value, "string", "save_metadata.media_hash")
            ? value.toString()
            : "";
        break;

      case key == "copies":
        nftMetadata.copies = assert_json(value, "number", "save_metadata.copies")
            ? (value.toU64() as i32)
            : 1;
        break;

      case key == "extra":
        log.warning(key + " --- " + stringifyJson(value) + " --- " + value.kind.toString(), [])
        nftMetadata.extra = assert_json(value, "string", "save_metadata.extra")
            ? value.toString()
            : "";
        break;

      case key == "reference":
        nftMetadata.reference = assert_json(value, "string", "save_metadata.reference")
            ? value.toString()
            : "";
        break;

      case key == "reference_hash":
        nftMetadata.reference_hash = assert_json(value, "string", "save_metadata.reference_hash")
            ? value.toString()
            : "";
        break;

      case key == "issued_at":
        nftMetadata.issued_at = assert_json(value, "string", "save_metadata.issued_at")
            ? value.toString()
            : "";
        break;

      case key == "starts_at":
        nftMetadata.starts_at = assert_json(value, "string", "save_metadata.starts_at")
            ? value.toString()
            : "";
        break;

      case key == "updated_at":
        nftMetadata.updated_at = assert_json(value, "string", "save_metadata.updated_at")
            ? value.toString()
            : "";
        break;

      case key == "expires_at":
        nftMetadata.expires_at = assert_json(value, "string", "save_metadata.expires_at")
            ? value.toString()
            : "";
        break;

    }
  }

  nftMetadata.save();
  return nftMetadata;
}

function save_activity(nft: Nft, info: Map<string, string>): Activity {
  const id = `${nft.id}_${info.get("timestamp")}`;

  const activity = new Activity(id);

  activity.nft = nft.id;
  activity.type = "mint";
  activity.timestamp = BigInt.fromString(info.get("timestamp"));

  activity.sender = nft.owner;

  activity.transaction_hash = info.get("transactionHash");
  activity.receipt_id = info.get("receiptId")
  activity.block_hash_58 = info.get("blockHash58")

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
