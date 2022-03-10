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

    switch (true) {
      case key == "spec":
        // spec is required
        if (!assert_json(value, "string", "save_contract_metadata.spec")) return null;
        contract.spec = value.toString();
        break;
      case key == "name":
        // name is required
        if (!assert_json(value, "string", "save_contract_metadata.name")) return null;
        contract.name = value.toString();
        break;
      case key == "symbol":
        // symbol is required
        if (!assert_json(value, "string", "save_contract_metadata.symbol")) return null;
        contract.symbol = value.toString();
        break;
      case key == "icon":
        contract.icon = assert_json(value, "string", "save_contract_metadata.icon") ? value.toString() : "";
        break;
      case key == "base_uri":
        contract.base_uri = assert_json(value, "string", "save_contract_metadata.base_uri") ? value.toString() : "";
        break;
      case key == "reference":
        contract.reference = assert_json(value, "string", "save_contract_metadata.reference") ? value.toString() : "";
        break;
      case key == "packages_script":
        contract.packages_script = assert_json(value, "string", "save_contract_metadata.packages_script") ? value.toString() : "";
        break;
      case key == "render_script":
        contract.render_script = assert_json(value, "string", "save_contract_metadata.render_script") ? value.toString() : "";
        break;
      case key == "style_css":
        contract.style_css = assert_json(value, "string", "save_contract_metadata.style_css") ? value.toString() : "";
        break;
      case key == "parameters":
        contract.parameters = assert_json(value, "string", "save_contract_metadata.parameters") ? value.toString() : "";
        break;
      case key == "mint_price":
        // mint_price is required
        if (!assert_json(value, "number", "save_contract_metadata.mint_price")) return null;
        contract.mint_price = value.toBigInt();
        break;
      case key == "max_copies":
        contract.max_copies = assert_json(value, "number", "save_contract_metadata.max_copies") ? value.toU64() as i32 : null;
        break;
      case key == "default_max_len_payout":
        contract.default_max_len_payout = assert_json(value, "number", "save_contract_metadata.default_max_len_payout") ? value.toU64() as i32 : null;
        break;
      case key == "mints_per_address":
        contract.mints_per_address = assert_json(value, "number", "save_contract_metadata.mints_per_address") ? value.toU64() as i32 : null;
        break;
      case key == "mint_payee_id":
        contract.mint_payee_id = assert_json(value, "string", "save_contract_metadata.mint_payee_id") ? value.toString() : "";
        break;
      case key == "mint_royalty_id":
        contract.mint_royalty_id = assert_json(value, "string", "save_contract_metadata.mint_royalty_id") ? value.toString() : "";
        break;
      case key == "mint_royalty_amount":
        contract.mint_royalty_amount = assert_json(value, "number", "save_contract_metadata.mint_royalty_amount") ? value.toBigInt() : null;
        break;
      case key == "min_bid_amount":
        contract.min_bid_amount = assert_json(value, "number", "save_contract_metadata.min_bid_amount") ? value.toBigInt() : null;
        break;
    }
  }

  contract.total_supply = BigInt.zero();

  contract.timestamp = BigInt.fromString(info.get("timestamp"));
  contract.updated_at = contract.timestamp;

  // Save NftContract entity
  contract.save();
}
