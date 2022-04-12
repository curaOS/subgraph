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
  const blockHash58 = receipt.block.header.hash.toBase58()

  map.set("contract", contractAdress);
  map.set("timestamp", timestamp);
  map.set("signerId", signerId);

  map.set("blockHash58", blockHash58);
  map.set("receiptId", receiptId);
  // Tx HASH is not available on The Graph
  map.set("transactionHash", '')

  return map;
}
