import { TransactionBlock } from "@mysten/sui.js/transactions";

export function createMintNftTxnBlock({ name, desc, url} : { name: string, desc: string, url: string}) {
  const txb = new TransactionBlock();
  const contractAddress =
    "0x5314b4086c2bfa0c500ef8c67cc31f695de5471c5e07604a1406cf424fb5b712";
  const contractModule = "REISE";
  const contractMethod = "mint";

  const nftName = `${name}`;
  const nftDescription = `${desc}`;
  const nftImgUrl = `${url}`

  txb.moveCall({
    target: `${contractAddress}::${contractModule}::${contractMethod}`,
    arguments: [
      txb.pure(nftName),
      txb.pure(nftDescription),
      txb.pure(nftImgUrl),
    ],
  });

  return txb;
}