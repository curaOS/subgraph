import { JSONValue, JSONValueKind } from "@graphprotocol/graph-ts";

export function stringifyJson(input: JSONValue): string {
  if (input.kind == JSONValueKind.ARRAY) {
    let arr = input.toArray();
    let arrString = "";
    // add the opening
    arrString += "[";
    for (let i = 0; i < arr.length; i++) {
      const value = stringifyJson(arr[i]);
      arrString += `${value}`;
      arrString += `,`;
    }
    // add the closing curly brace
    arrString += "]";
    return arrString;
  }
  if (input.kind == JSONValueKind.BOOL) {
    if (input.toBool()) {
      return "true";
    }
    return "false";
  }
  if (input.kind == JSONValueKind.NULL) {
    return "null";
  }
  if (input.kind == JSONValueKind.NUMBER) {
    return input.toBigInt().toString();
  }
  if (input.kind == JSONValueKind.OBJECT) {
    let obj = input.toObject();
    let objString = "";
    // add the opening curly brace
    objString += "{";
    for (let i = 0; i < obj.entries.length; i++) {
      const value = stringifyJson(obj.entries[i].value);
      objString += `${value}`;
      objString += `,`;
    }
    // add the closing curly brace
    objString += "}";
    return objString;
  }
  if (input.kind == JSONValueKind.STRING) {
    return input.toString();
  }
  return "unknown";
}
