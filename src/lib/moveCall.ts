import { TransactionBlock } from "@mysten/sui.js/transactions";

export function createMintNftTxnBlock({ _name, _description, _url, _lat, _lng, _category, _creator, _address_local, _collection_name} : { _name: Uint8Array, _description: Uint8Array, _url: Uint8Array, _lat: Uint8Array, _lng: Uint8Array, _category: Uint8Array, _creator: string, _address_local: Uint8Array, _collection_name: Uint8Array}) {
  const txb = new TransactionBlock();
  
  const contractAddress =
    "0x31fd50b46dab531e790238b3e34c4bc72c500d280cd12a025197ef1b1a9e94c1";
  const contractModule = "REISE_NFT";
  const contractMethod = "mint_reise_nft";

  const nftName = `${_name}`;
  const nftDescription = `${_description}`;
  const nftImgUrl = `${_url}`
  const nftLat = `${_lat}`
  const nftLng = `${_lng}`
  const nftCategory = `${_category}`
  const nftCreator = `${_creator}`
  const nftAddressLocal = `${_address_local}`
  const nftCollectionName = `${_collection_name}`
  
  txb.moveCall({
    target: `${contractAddress}::${contractModule}::${contractMethod}`,
    arguments: [
      txb.pure(nftName),
      txb.pure(nftAddressLocal),
      txb.pure(nftLat),
      txb.pure(nftLng),
      txb.pure(nftDescription),
      txb.pure(nftCategory),
      txb.pure(nftCreator),
      txb.pure(nftImgUrl),
      txb.pure(nftCollectionName),
    ],
  });
  return txb;
}



