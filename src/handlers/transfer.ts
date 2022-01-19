import { JSONValue, BigInt } from "@graphprotocol/graph-ts";
import { Account, Activity, Nft } from "../../generated/schema";
import { assert_json } from "../utils/assert";

export default function transfer(
  event_data: JSONValue,
  info: Map<string, string>
): void {
  const new_owner_id = event_data
    .toObject()
    .get("new_owner_id")!
    .toString();
  const old_owner_id = event_data
    .toObject()
    .get("old_owner_id")!
    .toString();

  const tokenIdsJson = event_data.toObject().get("token_ids")!;
  if (!assert_json(tokenIdsJson, "array", "transfer.data.token_ids")) return;

  const tokenIds = tokenIdsJson.toArray();
  for (let i = 0; i < tokenIds.length; i++) {
    if (!assert_json(tokenIds[i], "string", `transfer.data.token_ids.${i}`))
      continue;
    const nft = update_nft(tokenIds[i].toString(), new_owner_id, old_owner_id);
    if (nft != null) {
      save_activity(nft, new_owner_id, old_owner_id, info);
      update_account(new_owner_id);
      update_account(old_owner_id, true);
    }
  }
}

function update_nft(
  id: string,
  new_owner_id: string,
  old_owner_id: string
): Nft {
  let nft = Nft.load(id);
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

  activity.transferFrom = old_owner_id;
  activity.transferTo = new_owner_id;

  // To do: find a way to get transaction hash instead of the receipt id
  activity.transactionHash = info.get("receiptId");

  activity.save();

  return activity;
}

function update_account(address: string, remove: boolean = false): void {
  let account = Account.load(address);

  // if account doesn't exist save new account
  if (!account) {
    account = new Account(address);
    account.total_supply = BigInt.fromI32(0);
  }

  if (remove) {
    account.total_supply = account.total_supply.minus(BigInt.fromI32(1));
  } else {
    account.total_supply = account.total_supply.plus(BigInt.fromI32(1));
  }

  account.save();
}
