import { near, log, JSONValue, JSONValueKind } from "@graphprotocol/graph-ts";

// Assert that the action is a function called
export function assert_function_call(
  value: near.ActionValue,
  msg: string = ""
): boolean {
  if (value.kind != near.ActionKind.FUNCTION_CALL) {
    log.warning(`Not a function call: {}, message: {}`, [
      value.kind.toString(),
      msg,
    ]);
    return false;
  }
  return true;
}

// Assert that the json value is an object
export function assert_json_object(
  value: JSONValue,
  msg: string = ""
): boolean {
  if (value.kind != JSONValueKind.OBJECT) {
    log.warning(`Not a json object: {}, message: {}`, [
      value.kind.toString(),
      msg,
    ]);
    return false;
  }
  return true;
}
