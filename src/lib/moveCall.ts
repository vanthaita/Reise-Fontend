import { TransactionBlock } from "@mysten/sui.js/transactions";

export function createMintNftTxnBlock({ _name, _description, _url, _lat, _lng, _category, _creator, _address_local, _collection_name} : 
  { _name: string, _description: string, _url: string , _lat: string, _lng: string, _category: string, _creator: string, _address_local: string, _collection_name: string}) {
  const txb = new TransactionBlock();
  const contractAddress =
    `${process.env.NEXT_PUBLIC_PACKAGEID}`;
  const contractModule = "REISE_NFT";
  const contractMethod = "mint_reise_nft";
  const nftName = `${_name}`;
  const nftDescription = `${_description}`;

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
      txb.pure(nftDescription),
      txb.pure.string(_url),
      txb.pure(nftLat),
      txb.pure(nftLng),
      txb.pure(nftCategory),
      txb.pure(_creator),
      txb.pure(nftAddressLocal),
      txb.pure(nftCollectionName),
    ],
  });
  return txb;
}



