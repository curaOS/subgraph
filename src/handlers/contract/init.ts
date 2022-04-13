import {BigInt, JSONValue, log} from "@graphprotocol/graph-ts";
import {NftContract, NftContractMetadata, User} from "../../../generated/schema";
import { assert_json } from "../../utils/assert";

export default function init(
  event_data: JSONValue,
  info: Map<string, string>
): void {
  const metadata = event_data.toObject().get("metadata")!;
  const extra = event_data.toObject().get("extra")!;

  if (!assert_json(metadata, "object", "init.data.metadata")) return;
  if (!assert_json(extra, "object", "init.data.extra")) return;

  save_contract(metadata, info);
  save_contract_metadata(metadata, extra, info)
}

function save_contract(metadata: JSONValue, info: Map<string, string>): void {
  // create a new NftContract entity with the contractAdress as id
  const contract = new NftContract(`${info.get("contract")}`);

  contract.total_supply = BigInt.zero();

  contract.timestamp = BigInt.fromString(info.get("timestamp"));
  contract.updated_at = contract.timestamp;

  // Save NftContract entity
  contract.save();
}


function save_contract_metadata (metadata: JSONValue, extra: JSONValue, info: Map<string, string>): void {
  // create a new NftContractMetadata entity with the contractAddress as id
  const contract_metadata = new NftContractMetadata(`${info.get("contract")}`);

  contract_metadata.contract = info.get("contract");

  // map metadata object into the contract entity
  const entries = metadata.toObject().entries;
  const entriesExtra = extra.toObject().entries;

  for (let i = 0; i < entries.length; i++) {
    const key = entries[i].key;
    const value = entries[i].value;

    switch (true) {
      case key == "spec":
        contract_metadata.spec = assert_json(value, "string", "save_contract_metadata.spec") ? value.toString() : "";
        break;
      case key == "name":
        contract_metadata.name = assert_json(value, "string", "save_contract_metadata.name") ? value.toString() : "";
        break;
      case key == "symbol":
        contract_metadata.symbol = assert_json(value, "string", "save_contract_metadata.symbol") ? value.toString() : "";
        break;
      case key == "icon":
        contract_metadata.icon = assert_json(value, "string", "save_contract_metadata.icon") ? value.toString() : "";
        break;
      case key == "base_uri":
        contract_metadata.base_uri = assert_json(value, "string", "save_contract_metadata.base_uri") ? value.toString() : "";
        break;
      case key == "reference":
        contract_metadata.reference = assert_json(value, "string", "save_contract_metadata.reference") ? value.toString() : "";
        break;
    }
  }

  for (let i = 0; i < entriesExtra.length; i++) {
    const key = entriesExtra[i].key;
    const value = entriesExtra[i].value;

    switch (true) {
      case key == "mint_price":
        contract_metadata.mint_price = assert_json(value, "string", "save_contract_metadata.mint_price") ? value.toString() : "0";
        break;
      case key == "max_copies":
        contract_metadata.max_copies = assert_json(value, "number", "save_contract_metadata.max_copies") ? (value.toU64() as i32) : 1;
        break;
      case key == "default_max_len_payout":
        contract_metadata.default_max_len_payout = assert_json(value, "number", "save_contract_metadata.default_max_len_payout") ? (value.toU64() as i32) : 10;
        break;
      case key == "mints_per_address":
        contract_metadata.mints_per_address = assert_json(value, "number", "save_contract_metadata.mints_per_address") ? (value.toU64() as i32) : 100;
        break;
      case key == "mint_payee_id":
        update_user(value.toString());
        contract_metadata.mint_payee_id = assert_json(value, "string", "save_contract_metadata.mint_payee_id") ? value.toString() : "";
        break;
      case key == "mint_royalty_id":
        update_user(value.toString());
        contract_metadata.mint_royalty_id = assert_json(value, "string", "save_contract_metadata.mint_royalty_id") ? value.toString() : "";
        break;
      case key == "mint_royalty_amount":
        contract_metadata.mint_royalty_amount = assert_json(value, "number", "save_contract_metadata.mint_royalty_amount") ? value.toBigInt() : new BigInt(0);
        break;
      case key == "min_bid_amount":
        contract_metadata.min_bid_amount = assert_json(value, "number", "save_contract_metadata.min_bid_amount") ? value.toBigInt() : new BigInt(0);
        break;
      case key == "packages_script":
        contract_metadata.packages_script = assert_json(value, "string", "save_contract_metadata.packages_script") ? value.toString() : "";
        break;
      case key == "render_script":
        contract_metadata.render_script = assert_json(value, "string", "save_contract_metadata.render_script") ? value.toString() : "";
        break;
      case key == "style_css":
        contract_metadata.style_css = assert_json(value, "string", "save_contract_metadata.style_css") ? value.toString() : "";
        break;
      case key == "parameters":
        contract_metadata.parameters = assert_json(value, "string", "save_contract_metadata.parameters") ? value.toString() : "";
        break;
    }
  }

  // Save NftContract entity
  contract_metadata.save();
}

function update_user(address: string): void {
  let user = User.load(address);

  // if account doesn't exist save new account
  if (!user) {
    user = new User(address);
    user.total_owned = BigInt.zero();
    user.total_minted = BigInt.zero();
  }

  user.save();
}