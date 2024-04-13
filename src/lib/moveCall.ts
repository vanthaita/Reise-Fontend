import { TransactionBlock } from "@mysten/sui.js/transactions";

export function createMintNftTxnBlock({ _name, _description, _url, _lat, _lng, _category, _creator, _address_local, _collection_name} : 
  { _name: string, _description: string, _url: string , _lat: string, _lng: string, _category: string, _creator: string, _address_local: string, _collection_name: string}) {
  const txb = new TransactionBlock();
  // PACKAGEID = 0x0f8c384416f2205d92f84a07fe5feee2f62a8ec3d07fa6b12707ee283d0e655e
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
      txb.pure.string(nftName),
      txb.pure.string(nftDescription),
      txb.pure.string(_url as string),
      txb.pure.string(nftLat),
      txb.pure.string(nftLng),
      txb.pure.string(nftCategory),
      txb.pure(nftCreator),
      txb.pure.string(nftAddressLocal),
      txb.pure.string(nftCollectionName),
    ],
  });
  return txb;
}



