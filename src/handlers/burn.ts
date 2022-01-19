import { JSONValue, BigInt, store } from "@graphprotocol/graph-ts";
import { Account, Activity, Nft, NftContract } from "../../generated/schema";
import { assert_json } from "../utils/assert";

export default function burn(
  event_data: JSONValue,
  info: Map<string, string>
): void {
  const tokenIdsJson = event_data.toObject().get("token_ids")!;
  if (!assert_json(tokenIdsJson, "array", "burn.data.token_ids")) return;

  const tokenIds = tokenIdsJson.toArray();
  for (let i = 0; i < tokenIds.length; i++) {
    if (!assert_json(tokenIds[i], "string", `burn.data.token_ids.${i}`))
      continue;
    remove_nft(tokenIds[i].toString());
    save_activity(tokenIds[i].toString(), info);
    update_account(info);
    update_contract(info);
  }
}

function remove_nft(id: string): void {
  store.remove("Nft", id);
}

function save_activity(tokenId: string, info: Map<string, string>): Activity {
  const id = `${tokenId}/${info.get("timestamp")}`;

  const activity = new Activity(id);

  activity.nft = tokenId;
  activity.type = "burn";
  activity.timestamp = BigInt.fromString(info.get("timestamp"));

  activity.burnBy = info.get("signerId");

  // To do: find a way to get transaction hash instead of the receipt id
  activity.transactionHash = info.get("receiptId");

  activity.save();

  return activity;
}

function update_account(info: Map<string, string>): void {
  let account = Account.load(info.get("signerId"))!;
  account.total_supply = account.total_supply.minus(BigInt.fromI32(1));
  account.save();
}

function update_contract(info: Map<string, string>): void {
  let contract = NftContract.load(info.get("contract"))!;
  contract.total_supply = contract.total_supply.minus(BigInt.fromI32(1));
  contract.save();
}
