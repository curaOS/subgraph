import {BigInt, JSONValue, store} from "@graphprotocol/graph-ts";
import { assert_json } from "../../utils/assert";
import {Activity} from "../../../generated/schema";

export default function remove_bid(
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
        remove(
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

function remove(
    tokenId: string,
    bidder: string,
): boolean {
    const bid = store.get("Bid", `${tokenId}-${bidder}`);
    if (bid) {
        store.remove("Bid", `${tokenId}-${bidder}`);
        return true;
    }
    return false;
}


function save_activity(
    tokenId: string,
    bidder: string,
    info: Map<string, string>
): Activity {
    const id = `${tokenId}-${bidder}/${info.get("timestamp")}`;

    const activity = new Activity(id);

    activity.type = "remove_bid";

    activity.nft = tokenId;
    activity.sender = bidder;

    activity.timestamp = BigInt.fromString(info.get("timestamp"));
    activity.transaction_hash = info.get("transactionHash");
    activity.receipt_id = info.get("receiptId")
    activity.block_hash_58 = info.get("blockHash58")

    activity.save();

    return activity;
}
