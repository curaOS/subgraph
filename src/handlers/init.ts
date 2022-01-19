import { JSONValue } from "@graphprotocol/graph-ts";
import { NftContract } from "../../generated/schema";
import { assert_json } from "../utils/assert";

export default function init(
  event_data: JSONValue,
  info: Map<string, string>
): void {
  const metadata = event_data.toObject().get("metadata")!;

  if (!assert_json(metadata, "object", "init.data.metadata")) return;

  save_contract(metadata, info.get("contract"));
}

function save_contract(metadata: JSONValue, contractAdress: string): void {
  // create a new NftContract entity with the contractAdress as id
  const contract = new NftContract(`${contractAdress}`);

  // map metadata object into the contract entity
  const entries = metadata.toObject().entries;
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].key == "spec") {
      contract.spec = entries[i].value.toString();
    }
    if (entries[i].key == "name") {
      contract.name = entries[i].value.toString();
    }
    if (entries[i].key == "symbol") {
      contract.symbol = entries[i].value.toString();
    }
    if (entries[i].key == "icon") {
      contract.icon = entries[i].value.toString();
    }
    if (entries[i].key == "base_uri") {
      contract.base_uri = entries[i].value.toString();
    }
    if (entries[i].key == "base_uri") {
      contract.base_uri = entries[i].value.toString();
    }
    if (entries[i].key == "reference") {
      contract.reference = entries[i].value.toString();
    }
    if (entries[i].key == "packages_script") {
      contract.packages_script = entries[i].value.toString();
    }
    if (entries[i].key == "render_script") {
      contract.render_script = entries[i].value.toString();
    }
    if (entries[i].key == "style_css") {
      contract.style_css = entries[i].value.toString();
    }
    if (entries[i].key == "parameters") {
      contract.parameters = entries[i].value.toString();
    }
  }

  contract.save();
}
