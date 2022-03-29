import { near } from "@graphprotocol/graph-ts";

// extract important data from the receipt
export function getReceiptInfo(
  receipt: near.ReceiptWithOutcome
): Map<string, string> {
  const map = new Map<string, string>();

  const contractAdress = receipt.receipt.receiverId;
  const timestamp = receipt.block.header.timestampNanosec.toString();
  const receiptId = receipt.receipt.id.toBase58();
  const signerId = receipt.receipt.signerId.toString();
  const blockHeight = receipt.block.header.height.toString()

  map.set("contract", contractAdress);
  map.set("timestamp", timestamp);
  map.set("signerId", signerId);

  map.set("blockHeight", blockHeight);
  map.set("receiptId", receiptId);
  // Tx HASH is not available on The Graph
  map.set("transactionHash", '')

  return map;
}
