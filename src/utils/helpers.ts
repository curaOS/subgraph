import { near } from "@graphprotocol/graph-ts";

// extract important data from the receipt
export function getReceiptInfo(
  receipt: near.ReceiptWithOutcome
): Map<string, string> {
  const map = new Map<string, string>();

  const contractAdress = receipt.receipt.receiverId;
  const timestamp = receipt.block.header.timestampNanosec.toString();
  const receiptId = receipt.receipt.id.toBase58();

  map.set("contract", contractAdress);
  map.set("timestamp", timestamp);
  map.set("receiptId", receiptId);

  return map;
}
