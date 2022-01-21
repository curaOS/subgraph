import { JSONValue, BigInt, store } from "@graphprotocol/graph-ts";
import { User, Activity, NftContract } from "../../../generated/schema";
import { assert_json } from "../../utils/assert";

export default function burn(
  event_data: JSONValue,
  info: Map<string, string>
): void {
  const token_ids_json = event_data.toObject().get("token_ids")!;
  if (!assert_json(token_ids_json, "array", "burn.data.token_ids")) return;
  const token_ids = token_ids_json.toArray();

  // for each token
  for (let i = 0; i < token_ids.length; i++) {
    // make sure token id a valid string
    if (!assert_json(token_ids[i], "string", `burn.data.token_ids.${i}`))
      continue;

    // remove nft
    const removed = remove_nft(token_ids[i].toString());

    // if nft exist and just got removed
    if (removed) {
      save_activity(token_ids[i].toString(), info);
      update_user(info);
      update_contract(info);
    }
  }
}

function remove_nft(id: string): boolean {
  const nft = store.get("Nft", id);
  if (nft) {
    store.remove("Nft", id);
    return true;
  }
  return false;
}

function save_activity(tokenId: string, info: Map<string, string>): Activity {
  const id = `${tokenId}/${info.get("timestamp")}`;

  const activity = new Activity(id);

  activity.nft = tokenId;
  activity.type = "burn";
  activity.timestamp = BigInt.fromString(info.get("timestamp"));

  activity.burnBy = info.get("signerId");

  activity.transactionHash = info.get("transactionHash");

  activity.save();
  return activity;
}

function update_user(info: Map<string, string>): void {
  let user = User.load(info.get("signerId"))!;
  if (!user) {
    return;
  }
  user.total_owned = user.total_owned.minus(BigInt.fromI32(1));
  user.save();
}

function update_contract(info: Map<string, string>): void {
  let contract = NftContract.load(info.get("contract"))!;
  contract.total_supply = contract.total_supply.minus(BigInt.fromI32(1));
  contract.save();
}
