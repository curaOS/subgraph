import { near, log, json } from "@graphprotocol/graph-ts";
import { handleMethod } from "./handlers";

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
  if (action.kind != near.ActionKind.FUNCTION_CALL) {
    log.info("Early return: {}", ["Not a function call"]);
    return;
  }

  const functionCall = action.toFunctionCall();
  const methodName = functionCall.methodName.toString();
  const args = json.try_fromBytes(functionCall.args);

  log.error("Method called: {}, With args: {}", [
    methodName,
    args.value.toString(),
  ]);

  handleMethod(methodName);
}
