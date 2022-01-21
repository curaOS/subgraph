import { BigInt, JSONValue } from "@graphprotocol/graph-ts";
import { NftContract } from "../../../generated/schema";
import { assert_json } from "../../utils/assert";

export default function init(
  event_data: JSONValue,
  info: Map<string, string>
): void {
  const metadata = event_data.toObject().get("metadata")!;

  if (!assert_json(metadata, "object", "init.data.metadata")) return;

  save_contract(metadata, info);
}

function save_contract(metadata: JSONValue, info: Map<string, string>): void {
  // create a new NftContract entity with the contractAdress as id
  const contract = new NftContract(`${info.get("contract")}`);

  // map metadata object into the contract entity
  const entries = metadata.toObject().entries;
  for (let i = 0; i < entries.length; i++) {
    const key = entries[i].key;
    const value = entries[i].value;

    // all metadata values should be a string
    if (!assert_json(value, "string")) return;

    switch (true) {
      case key == "spec":
        contract.spec = value.toString();
      case key == "name":
        contract.name = value.toString();
      case key == "symbol":
        contract.symbol = value.toString();
      case key == "icon":
        contract.icon = value.toString();
      case key == "base_uri":
        contract.base_uri = value.toString();
      case key == "reference":
        contract.reference = value.toString();
      case key == "packages_script":
        contract.packages_script = value.toString();
      case key == "render_script":
        contract.render_script = value.toString();
      case key == "style_css":
        contract.style_css = value.toString();
      case key == "parameters":
        contract.parameters = value.toString();
    }
  }

  contract.total_supply = BigInt.zero();

  contract.timestamp = BigInt.fromString(info.get("timestamp"));
  contract.updated_at = contract.timestamp;

  // Save NftContract entity
  contract.save();
}
