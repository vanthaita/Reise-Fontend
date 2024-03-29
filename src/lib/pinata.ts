// import axios from 'axios';
// import FormData from 'form-data'
// const fs = require('fs')
// const JWT = 'Bearer PASTE_YOUR_PINATA_JWT'

// const pinJSONToIPFS = async () => {
  
//   const data = JSON.stringify({
//     pinataContent: {
//       name: "Pinnie NFT",
//       description: "A nice NFT of Pinnie the Pinata",
//       external_url: "https://pinata.cloud",
//       image: "ipfs://bafkreih5aznjvttude6c3wbvqeebb6rlx5wkbzyppv7garjiubll2ceym4"
//     },
//     pinataMetadata: {
//       name: "metadata.json"
//     }
//   })
  
//     try{
//       const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: JWT
//         }
//       });
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
// }

// pinJSONToIPFS()
