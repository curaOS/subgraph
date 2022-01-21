import { BigInt, JSONValue } from "@graphprotocol/graph-ts";
import { Bid } from "../../../generated/schema";
import { assert_json } from "../../utils/assert";

export default function bid(
  event_data: JSONValue,
  info: Map<string, string>
): void {
  const data = event_data.toObject();

  const token_ids_json = data.get("token_ids")!;
  if (!assert_json(token_ids_json, "array", "bid.token_ids")) return;
  const token_ids = token_ids_json.toArray();

  const bidder = data.get("bidder_id")!;
  if (!assert_json(bidder, "string", "bid.bidder_id")) return;

  const amount = data.get("amount")!;
  if (!assert_json(bidder, "number", "bid.amount")) return;

  for (let i = 0; i < token_ids.length; i++) {
    save_bid(
      token_ids[i].toString(),
      bidder.toString(),
      parseInt(amount.toString()),
      info
    );
  }
}

function save_bid(
  tokenId: string,
  bidder: string,
  amount: number,
  info: Map<string, string>
): void {
  const bid = new Bid(`${tokenId}-${bidder}`);

  bid.nft = tokenId;
  bid.bidder = bidder;
  bid.amount = amount as i32;
  bid.timestamp = BigInt.fromString(info.get("timestamp"));

  bid.save();
}
