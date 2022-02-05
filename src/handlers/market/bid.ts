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

  const recipient = data.get("recipient")!;
  if (!assert_json(recipient, "string", "bid.recipient")) return;

  const sell_on_share = data.get("sell_on_share")!;
  if (!assert_json(sell_on_share, "number", "bid.sell_on_share")) return;

  const currency = data.get("currency")!;
  if (!assert_json(currency, "string", "bid.currency")) return;

  for (let i = 0; i < token_ids.length; i++) {
    save_bid(
      token_ids[i].toString(),
      bidder.toString(),
      amount.toString(),
      recipient.toString(),
      sell_on_share.toString(),
      currency.toString(),
      info
    );
  }
}

function save_bid(
  tokenId: string,
  bidder: string,
  amount: string,
  recipient: string,
  sell_on_share: string,
  currency: string,
  info: Map<string, string>
): void {
  const bid = new Bid(`${tokenId}-${bidder}`);

  bid.nft = tokenId
  bid.timestamp = BigInt.fromString(info.get("timestamp"));

  bid.amount = BigInt.fromString(amount)
  bid.bidder = bidder
  bid.recipient = recipient
  // @ts-ignore
  bid.sell_on_share = parseInt(sell_on_share) as i32
  bid.currency = currency

  bid.accepted = false

  bid.save();
}
