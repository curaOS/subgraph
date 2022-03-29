import { JSONValue, BigInt } from "@graphprotocol/graph-ts";
import { User, Activity, Nft } from "../../../generated/schema";
import { assert_json } from "../../utils/assert";

export default function transfer(
  event_data: JSONValue,
  info: Map<string, string>
): void {
  // new_owner_id is required
  const new_owner_id_json = event_data.toObject().get("new_owner_id")!;
  if (!assert_json(new_owner_id_json, "string")) return;
  const new_owner_id = new_owner_id_json.toString();

  // old_owner_id is required
  const old_owner_id_json = event_data.toObject().get("old_owner_id")!;
  if (!assert_json(old_owner_id_json, "string")) return;
  const old_owner_id = old_owner_id_json.toString();

  // token_ids is required
  const token_ids_json = event_data.toObject().get("token_ids")!;
  if (!assert_json(token_ids_json, "array", "transfer.data.token_ids")) return;
  const token_ids = token_ids_json.toArray();

  for (let i = 0; i < token_ids.length; i++) {
    // make sure the token id is a valid string
    if (!assert_json(token_ids[i], "string", `transfer.data.token_ids.${i}`))
      continue;

    // update nft ownership
    const nft = update_nft(token_ids[i].toString(), new_owner_id, old_owner_id);

    // if nft exists and updated successfully
    if (nft != null) {
      save_activity(nft, new_owner_id, old_owner_id, info);
      update_user(new_owner_id);
      update_user(old_owner_id, true);
    }
  }
}

function update_nft(
  id: string,
  new_owner_id: string,
  old_owner_id: string
): Nft | null {
  let nft = Nft.load(id);
  if (!nft) {
    return null;
  }
  nft.owner = new_owner_id;
  nft.prev_owner = old_owner_id;

  nft.save();
  return nft;
}

function save_activity(
  nft: Nft,
  new_owner_id: string,
  old_owner_id: string,
  info: Map<string, string>
): Activity {
  const id = `${nft.id}/${info.get("timestamp")}`;

  const activity = new Activity(id);

  activity.nft = nft.id;
  activity.type = "transfer";
  activity.timestamp = BigInt.fromString(info.get("timestamp"));

  activity.sender = old_owner_id;
  activity.recipient = new_owner_id;

  activity.transaction_hash = info.get("transactionHash");
  activity.receipt_id = info.get("receiptId")
  activity.block_height = info.get("blockHeight")

  activity.save();
  return activity;
}

function update_user(address: string, remove: boolean = false): void {
  let user = User.load(address);

  // if account doesn't exist save new account
  if (!user) {
    user = new User(address);
    user.total_owned = BigInt.zero();
    user.total_minted = BigInt.zero();
  }

  if (remove) {
    user.total_owned = user.total_owned.minus(BigInt.fromI32(1));
  } else {
    user.total_owned = user.total_owned.plus(BigInt.fromI32(1));
  }

  user.save();
}
