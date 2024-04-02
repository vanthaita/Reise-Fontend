// import connectMongoDB from '@/lib/mongodb';
// import LocationModel from '../../../models/locationInfo';
// import { NextResponse } from "next/server";
// import { LocationInfo } from '@/types';
// async function handler(req: Request) {
//     try {   
//         if (req.method !== 'GET') {
//             return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 status: 500,
//               }); 
//         }      
//         await connectMongoDB();

//         const locations: LocationInfo[] = await LocationModel.find();
//         return new NextResponse(JSON.stringify(locations), {
//           headers: {
//               "Content-Type": "application/json",
//           },
//           status: 200, // OK status code
//       });

//     } catch(error) {
//         console.error("Error:", error);
//         return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
//             headers: {
//               "Content-Type": "application/json",
//             },
//             status: 500,
//           });
//     }
// }


// export {handler as GET}