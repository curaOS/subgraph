import {BigInt, JSONValue} from "@graphprotocol/graph-ts";
import {Activity, Bid, Nft} from "../../../generated/schema";
import { assert_json } from "../../utils/assert";

export default function accept_bid(
    event_data: JSONValue,
    info: Map<string, string>
): void {
    const data = event_data.toObject();

    const token_ids_json = data.get("token_ids")!;
    if (!assert_json(token_ids_json, "array", "bid.token_ids")) return;
    const token_ids = token_ids_json.toArray();

    const bidder = data.get("bidder_id")!;
    if (!assert_json(bidder, "string", "bid.bidder_id")) return;

    for (let i = 0; i < token_ids.length; i++) {
        update_bid(
            token_ids[i].toString(),
            bidder.toString(),
        );
        save_activity(
            token_ids[i].toString(),
            bidder.toString(),
            info
        );
    }
}

function update_bid(
    tokenId: string,
    bidder: string,
): Bid | null {
    let bid = Bid.load(`${tokenId}-${bidder}`);
    if (!bid) {
        return null;
    }
    bid.accepted = true;

    bid.save();
    return bid;
}


function save_activity(
    tokenId: string,
    bidder: string,
    info: Map<string, string>
): Activity {
    const id = `${tokenId}-${bidder}/${info.get("timestamp")}`;

    const activity = new Activity(id);

    let token = Nft.load(`${tokenId}`);
    let bid = Bid.load(`${tokenId}-${bidder}`);

    if (bid) {
        activity.amount = bid.amount;
    }
    if (token) {
        activity.sender = token.owner;
    }

    activity.type = "accept_bid";
    activity.nft = tokenId;

    activity.recipient = bidder;

    activity.timestamp = BigInt.fromString(info.get("timestamp"));
    activity.transactionHash = info.get("transactionHash");

    activity.save();

    return activity;
}
