import { near, json } from "@graphprotocol/graph-ts";
import { handleEvent } from "./handlers";

import { assert_function_call } from "./utils/assert";
import { getReceiptInfo } from "./utils/helpers";
export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  // log.info('Receipt: ' + receipt, []);


  const actions = receipt.receipt.actions;

  // Get transaction info from the receipt
  const info = getReceiptInfo(receipt);

  for (let i = 0; i < actions.length; i++) {
    handleAction(actions[i], info, receipt.outcome);
  }
}

function handleAction(
  action: near.ActionValue,
  info: Map<string, string>,
  outcome: near.ExecutionOutcome
): void {
  if (!assert_function_call(action)) return;

  if (!outcome.logs[0]) {
    return;
  }

  // Parse the json object from receipt logs, remove NEAR EVENT_JSON hook from string before
  const event = json.fromString(outcome.logs[0].replace('EVENT_JSON:',''));

  // Event handler that maps data to GraphQl entities
  handleEvent(event, info);
}
