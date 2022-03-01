import {BigInt, JSONValue, store} from "@graphprotocol/graph-ts";
import {Activity, Bid, BidActivity, Nft, User} from "../../../generated/schema";
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
  if (!assert_json(bidder, "string", "bid.amount")) return;

  const recipient = data.get("recipient")!;
  if (!assert_json(recipient, "string", "bid.recipient")) return;

  const sell_on_share = data.get("sell_on_share")!;
  if (!assert_json(sell_on_share, "string", "bid.sell_on_share")) return;

  const currency = data.get("currency")!;
  if (!assert_json(currency, "string", "bid.currency")) return;

  for (let i = 0; i < token_ids.length; i++) {
    let bid = Bid.load(`${token_ids[i].toString()}-${bidder.toString()}`)
    save_bid(
      token_ids[i].toString(),
      bidder.toString(),
      amount.toString(),
      recipient.toString(),
      sell_on_share.toString(),
      currency.toString(),
        bid ? true : false,
      info
    );
    save_activity(
        token_ids[i].toString(),
        bidder.toString(),
        amount.toString(),
        bid ? true : false,
        info
    )
  }
}

function save_bid(
  tokenId: string,
  bidder: string,
  amount: string,
  recipient: string,
  sell_on_share: string,
  currency: string,
  updatedBid: boolean,
  info: Map<string, string>
): void {
  let bid = null;

  if(updatedBid){
    bid = Bid.load(`${tokenId}-${bidder}`)
  } else {
    bid = new Bid(`${tokenId}-${bidder}`)
  }

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


function save_activity(
    bidder: string,
    tokenId: string,
    amount: string,
    updatedBid: boolean,
    info: Map<string, string>
): Activity {
  const id = `${tokenId}-${bidder}/${info.get("timestamp")}`;

  const activity = new Activity(id);
  const bidActivity = new BidActivity(id);

  bidActivity.nft = tokenId;
  bidActivity.performedBy = bidder;
  bidActivity.amount = BigInt.fromString(amount);

  if(updatedBid){
    bidActivity.type = "update";
  } else {
    bidActivity.type = "set";
  }

  activity.nft = tokenId;
  activity.type = "bid";
  activity.timestamp = BigInt.fromString(info.get("timestamp"));

  activity.bid = id;

  activity.transactionHash = info.get("transactionHash");

  activity.save();
  bidActivity.save();

  return activity;
}
