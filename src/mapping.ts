import {
  near,
  log,
  json,
  JSONValueKind,
  JSONValue,
} from "@graphprotocol/graph-ts";
import { handleEvent } from "./handlers";

import { assert_function_call, assert_json_object } from "./utils/assert";

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;

  for (let i = 0; i < actions.length; i++) {
    handleAction(
      actions[i],
      receipt.receipt,
      receipt.block.header,
      receipt.outcome
    );
  }
}

function handleAction(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader,
  outcome: near.ExecutionOutcome
): void {
  if (!assert_function_call(action)) return;

  // Parse the json object from receipt logs
  const event = json.fromString(outcome.logs[0]);

  // Get the contract name
  const contractAdress = receipt.receiverId;

  // Event handler that maps data to GraphQl entities
  handleEvent(event, contractAdress);
}
