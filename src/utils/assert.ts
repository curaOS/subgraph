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

// Assert that the json value is a specefic type
export function assert_json(
  input: JSONValue,
  type: string,
  msg: string = ""
): boolean {
  if (type == "string" && input.kind == JSONValueKind.STRING) {
    return true;
  }
  if (type == "bool" && input.kind == JSONValueKind.BOOL) {
    return true;
  }
  if (type == "null" && input.kind == JSONValueKind.NULL) {
    return true;
  }
  if (type == "number" && input.kind == JSONValueKind.NUMBER) {
    return true;
  }
  if (type == "array" && input.kind == JSONValueKind.ARRAY) {
    return true;
  }
  if (type == "object" && input.kind != JSONValueKind.STRING) {
    return true;
  }

  log.warning(`Not a json {}: {}${msg != "" ? ", message: {}" : ""}`, [
    type,
    input.kind.toString(),
    msg,
  ]);

  return false;
}
