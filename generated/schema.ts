// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class NftContract extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("updated_at", Value.fromBigInt(BigInt.zero()));
    this.set("total_supply", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NftContract entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save NftContract entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("NftContract", id.toString(), this);
    }
  }

  static load(id: string): NftContract | null {
    return changetype<NftContract | null>(store.get("NftContract", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get metadata(): string {
    let value = this.get("metadata");
    return value!.toString();
  }

  set metadata(value: string) {
    this.set("metadata", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get updated_at(): BigInt {
    let value = this.get("updated_at");
    return value!.toBigInt();
  }

  set updated_at(value: BigInt) {
    this.set("updated_at", Value.fromBigInt(value));
  }

  get total_supply(): BigInt {
    let value = this.get("total_supply");
    return value!.toBigInt();
  }

  set total_supply(value: BigInt) {
    this.set("total_supply", Value.fromBigInt(value));
  }

  get nfts(): Array<string> {
    let value = this.get("nfts");
    return value!.toStringArray();
  }

  set nfts(value: Array<string>) {
    this.set("nfts", Value.fromStringArray(value));
  }
}

export class NftContractMetadata extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("contract", Value.fromString(""));
    this.set("spec", Value.fromString(""));
    this.set("name", Value.fromString(""));
    this.set("symbol", Value.fromString(""));
    this.set("mint_price", Value.fromBigInt(BigInt.zero()));
    this.set("min_bid_amount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NftContractMetadata entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save NftContractMetadata entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("NftContractMetadata", id.toString(), this);
    }
  }

  static load(id: string): NftContractMetadata | null {
    return changetype<NftContractMetadata | null>(
      store.get("NftContractMetadata", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get contract(): string {
    let value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get spec(): string {
    let value = this.get("spec");
    return value!.toString();
  }

  set spec(value: string) {
    this.set("spec", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get icon(): string | null {
    let value = this.get("icon");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set icon(value: string | null) {
    if (!value) {
      this.unset("icon");
    } else {
      this.set("icon", Value.fromString(<string>value));
    }
  }

  get base_uri(): string | null {
    let value = this.get("base_uri");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set base_uri(value: string | null) {
    if (!value) {
      this.unset("base_uri");
    } else {
      this.set("base_uri", Value.fromString(<string>value));
    }
  }

  get reference(): string | null {
    let value = this.get("reference");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set reference(value: string | null) {
    if (!value) {
      this.unset("reference");
    } else {
      this.set("reference", Value.fromString(<string>value));
    }
  }

  get mint_price(): BigInt {
    let value = this.get("mint_price");
    return value!.toBigInt();
  }

  set mint_price(value: BigInt) {
    this.set("mint_price", Value.fromBigInt(value));
  }

  get max_copies(): i32 {
    let value = this.get("max_copies");
    return value!.toI32();
  }

  set max_copies(value: i32) {
    this.set("max_copies", Value.fromI32(value));
  }

  get default_max_len_payout(): i32 {
    let value = this.get("default_max_len_payout");
    return value!.toI32();
  }

  set default_max_len_payout(value: i32) {
    this.set("default_max_len_payout", Value.fromI32(value));
  }

  get mints_per_address(): i32 {
    let value = this.get("mints_per_address");
    return value!.toI32();
  }

  set mints_per_address(value: i32) {
    this.set("mints_per_address", Value.fromI32(value));
  }

  get mint_payee_id(): string | null {
    let value = this.get("mint_payee_id");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set mint_payee_id(value: string | null) {
    if (!value) {
      this.unset("mint_payee_id");
    } else {
      this.set("mint_payee_id", Value.fromString(<string>value));
    }
  }

  get mint_royalty_id(): string | null {
    let value = this.get("mint_royalty_id");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set mint_royalty_id(value: string | null) {
    if (!value) {
      this.unset("mint_royalty_id");
    } else {
      this.set("mint_royalty_id", Value.fromString(<string>value));
    }
  }

  get mint_royalty_amount(): BigInt | null {
    let value = this.get("mint_royalty_amount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set mint_royalty_amount(value: BigInt | null) {
    if (!value) {
      this.unset("mint_royalty_amount");
    } else {
      this.set("mint_royalty_amount", Value.fromBigInt(<BigInt>value));
    }
  }

  get min_bid_amount(): BigInt {
    let value = this.get("min_bid_amount");
    return value!.toBigInt();
  }

  set min_bid_amount(value: BigInt) {
    this.set("min_bid_amount", Value.fromBigInt(value));
  }

  get packages_script(): string | null {
    let value = this.get("packages_script");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set packages_script(value: string | null) {
    if (!value) {
      this.unset("packages_script");
    } else {
      this.set("packages_script", Value.fromString(<string>value));
    }
  }

  get render_script(): string | null {
    let value = this.get("render_script");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set render_script(value: string | null) {
    if (!value) {
      this.unset("render_script");
    } else {
      this.set("render_script", Value.fromString(<string>value));
    }
  }

  get style_css(): string | null {
    let value = this.get("style_css");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set style_css(value: string | null) {
    if (!value) {
      this.unset("style_css");
    } else {
      this.set("style_css", Value.fromString(<string>value));
    }
  }

  get parameters(): string | null {
    let value = this.get("parameters");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set parameters(value: string | null) {
    if (!value) {
      this.unset("parameters");
    } else {
      this.set("parameters", Value.fromString(<string>value));
    }
  }
}

export class Nft extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("contract", Value.fromString(""));
    this.set("owner", Value.fromString(""));
    this.set("creator", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Nft entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Nft entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Nft", id.toString(), this);
    }
  }

  static load(id: string): Nft | null {
    return changetype<Nft | null>(store.get("Nft", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get contract(): string {
    let value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get metadata(): string {
    let value = this.get("metadata");
    return value!.toString();
  }

  set metadata(value: string) {
    this.set("metadata", Value.fromString(value));
  }

  get history(): Array<string> {
    let value = this.get("history");
    return value!.toStringArray();
  }

  set history(value: Array<string>) {
    this.set("history", Value.fromStringArray(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get creator(): string {
    let value = this.get("creator");
    return value!.toString();
  }

  set creator(value: string) {
    this.set("creator", Value.fromString(value));
  }

  get prev_owner(): string | null {
    let value = this.get("prev_owner");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set prev_owner(value: string | null) {
    if (!value) {
      this.unset("prev_owner");
    } else {
      this.set("prev_owner", Value.fromString(<string>value));
    }
  }

  get royalties(): Array<string> | null {
    let value = this.get("royalties");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set royalties(value: Array<string> | null) {
    if (!value) {
      this.unset("royalties");
    } else {
      this.set("royalties", Value.fromStringArray(<Array<string>>value));
    }
  }

  get royalties_percentage(): i32 {
    let value = this.get("royalties_percentage");
    return value!.toI32();
  }

  set royalties_percentage(value: i32) {
    this.set("royalties_percentage", Value.fromI32(value));
  }

  get askedPrice(): i32 {
    let value = this.get("askedPrice");
    return value!.toI32();
  }

  set askedPrice(value: i32) {
    this.set("askedPrice", Value.fromI32(value));
  }

  get owner_share(): i32 {
    let value = this.get("owner_share");
    return value!.toI32();
  }

  set owner_share(value: i32) {
    this.set("owner_share", Value.fromI32(value));
  }

  get creator_share(): i32 {
    let value = this.get("creator_share");
    return value!.toI32();
  }

  set creator_share(value: i32) {
    this.set("creator_share", Value.fromI32(value));
  }

  get prev_owner_share(): i32 {
    let value = this.get("prev_owner_share");
    return value!.toI32();
  }

  set prev_owner_share(value: i32) {
    this.set("prev_owner_share", Value.fromI32(value));
  }

  get bids(): Array<string> | null {
    let value = this.get("bids");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set bids(value: Array<string> | null) {
    if (!value) {
      this.unset("bids");
    } else {
      this.set("bids", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class NftMetadata extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("nft", Value.fromString(""));
    this.set("title", Value.fromString(""));
    this.set("media", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NftMetadata entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save NftMetadata entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("NftMetadata", id.toString(), this);
    }
  }

  static load(id: string): NftMetadata | null {
    return changetype<NftMetadata | null>(store.get("NftMetadata", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nft(): string {
    let value = this.get("nft");
    return value!.toString();
  }

  set nft(value: string) {
    this.set("nft", Value.fromString(value));
  }

  get title(): string {
    let value = this.get("title");
    return value!.toString();
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get description(): string | null {
    let value = this.get("description");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set description(value: string | null) {
    if (!value) {
      this.unset("description");
    } else {
      this.set("description", Value.fromString(<string>value));
    }
  }

  get media(): string {
    let value = this.get("media");
    return value!.toString();
  }

  set media(value: string) {
    this.set("media", Value.fromString(value));
  }

  get media_animation(): string | null {
    let value = this.get("media_animation");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set media_animation(value: string | null) {
    if (!value) {
      this.unset("media_animation");
    } else {
      this.set("media_animation", Value.fromString(<string>value));
    }
  }

  get media_hash(): string | null {
    let value = this.get("media_hash");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set media_hash(value: string | null) {
    if (!value) {
      this.unset("media_hash");
    } else {
      this.set("media_hash", Value.fromString(<string>value));
    }
  }

  get copies(): i32 {
    let value = this.get("copies");
    return value!.toI32();
  }

  set copies(value: i32) {
    this.set("copies", Value.fromI32(value));
  }

  get extra(): string | null {
    let value = this.get("extra");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set extra(value: string | null) {
    if (!value) {
      this.unset("extra");
    } else {
      this.set("extra", Value.fromString(<string>value));
    }
  }

  get reference(): string | null {
    let value = this.get("reference");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set reference(value: string | null) {
    if (!value) {
      this.unset("reference");
    } else {
      this.set("reference", Value.fromString(<string>value));
    }
  }

  get reference_hash(): string | null {
    let value = this.get("reference_hash");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set reference_hash(value: string | null) {
    if (!value) {
      this.unset("reference_hash");
    } else {
      this.set("reference_hash", Value.fromString(<string>value));
    }
  }

  get issued_at(): string | null {
    let value = this.get("issued_at");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set issued_at(value: string | null) {
    if (!value) {
      this.unset("issued_at");
    } else {
      this.set("issued_at", Value.fromString(<string>value));
    }
  }

  get starts_at(): string | null {
    let value = this.get("starts_at");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set starts_at(value: string | null) {
    if (!value) {
      this.unset("starts_at");
    } else {
      this.set("starts_at", Value.fromString(<string>value));
    }
  }

  get updated_at(): string | null {
    let value = this.get("updated_at");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set updated_at(value: string | null) {
    if (!value) {
      this.unset("updated_at");
    } else {
      this.set("updated_at", Value.fromString(<string>value));
    }
  }

  get expires_at(): string | null {
    let value = this.get("expires_at");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set expires_at(value: string | null) {
    if (!value) {
      this.unset("expires_at");
    } else {
      this.set("expires_at", Value.fromString(<string>value));
    }
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("total_owned", Value.fromBigInt(BigInt.zero()));
    this.set("total_minted", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save User entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ownedNfts(): Array<string> | null {
    let value = this.get("ownedNfts");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set ownedNfts(value: Array<string> | null) {
    if (!value) {
      this.unset("ownedNfts");
    } else {
      this.set("ownedNfts", Value.fromStringArray(<Array<string>>value));
    }
  }

  get createdNfts(): Array<string> | null {
    let value = this.get("createdNfts");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set createdNfts(value: Array<string> | null) {
    if (!value) {
      this.unset("createdNfts");
    } else {
      this.set("createdNfts", Value.fromStringArray(<Array<string>>value));
    }
  }

  get bids(): Array<string> | null {
    let value = this.get("bids");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set bids(value: Array<string> | null) {
    if (!value) {
      this.unset("bids");
    } else {
      this.set("bids", Value.fromStringArray(<Array<string>>value));
    }
  }

  get total_owned(): BigInt {
    let value = this.get("total_owned");
    return value!.toBigInt();
  }

  set total_owned(value: BigInt) {
    this.set("total_owned", Value.fromBigInt(value));
  }

  get total_minted(): BigInt {
    let value = this.get("total_minted");
    return value!.toBigInt();
  }

  set total_minted(value: BigInt) {
    this.set("total_minted", Value.fromBigInt(value));
  }
}

export class Activity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("nft", Value.fromString(""));
    this.set("type", Value.fromString(""));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("sender", Value.fromString(""));
    this.set("transactionHash", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Activity entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Activity entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Activity", id.toString(), this);
    }
  }

  static load(id: string): Activity | null {
    return changetype<Activity | null>(store.get("Activity", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nft(): string {
    let value = this.get("nft");
    return value!.toString();
  }

  set nft(value: string) {
    this.set("nft", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get sender(): string {
    let value = this.get("sender");
    return value!.toString();
  }

  set sender(value: string) {
    this.set("sender", Value.fromString(value));
  }

  get recipient(): string | null {
    let value = this.get("recipient");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set recipient(value: string | null) {
    if (!value) {
      this.unset("recipient");
    } else {
      this.set("recipient", Value.fromString(<string>value));
    }
  }

  get amount(): BigInt | null {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt | null) {
    if (!value) {
      this.unset("amount");
    } else {
      this.set("amount", Value.fromBigInt(<BigInt>value));
    }
  }

  get transactionHash(): string {
    let value = this.get("transactionHash");
    return value!.toString();
  }

  set transactionHash(value: string) {
    this.set("transactionHash", Value.fromString(value));
  }
}

export class Bid extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("nft", Value.fromString(""));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("bidder", Value.fromString(""));
    this.set("recipient", Value.fromString(""));
    this.set("currency", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Bid entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Bid entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Bid", id.toString(), this);
    }
  }

  static load(id: string): Bid | null {
    return changetype<Bid | null>(store.get("Bid", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nft(): string {
    let value = this.get("nft");
    return value!.toString();
  }

  set nft(value: string) {
    this.set("nft", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get bidder(): string {
    let value = this.get("bidder");
    return value!.toString();
  }

  set bidder(value: string) {
    this.set("bidder", Value.fromString(value));
  }

  get recipient(): string {
    let value = this.get("recipient");
    return value!.toString();
  }

  set recipient(value: string) {
    this.set("recipient", Value.fromString(value));
  }

  get sell_on_share(): i32 {
    let value = this.get("sell_on_share");
    return value!.toI32();
  }

  set sell_on_share(value: i32) {
    this.set("sell_on_share", Value.fromI32(value));
  }

  get currency(): string {
    let value = this.get("currency");
    return value!.toString();
  }

  set currency(value: string) {
    this.set("currency", Value.fromString(value));
  }

  get accepted(): boolean {
    let value = this.get("accepted");
    return value!.toBoolean();
  }

  set accepted(value: boolean) {
    this.set("accepted", Value.fromBoolean(value));
  }
}
