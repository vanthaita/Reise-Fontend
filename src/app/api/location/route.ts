// import connectMongoDB from '@/lib/mongodb';
// import { NextResponse } from "next/server";
// import LocationModel from '../../../models/locationInfo';
// import { LocationInfo } from '@/types';



// async function handler(req: Request) {
//     try {
//         if (req.method !== 'POST') {
//             return NextResponse.json({ error: 'Method not allowed' });
//         }
//         await connectMongoDB();
//         const body = await req.json();
//         const {
//             localName,
//             lat,
//             lng,
//             image,
//             description,
//             creator,
//             address,
//             category,
//         }: LocationInfo = body;

//         const newLocation = await LocationModel.create({        
//             localName,
//             lat,
//             lng,
//             image,
//             description,
//             creator,
//             address,
//             category,
//         });
//         console.log("newLocation", newLocation);
//         return NextResponse.json({ success: true, message: 'Location saved successfully' });

//     } catch (error) {
//         console.error("Error:", error);
//         return NextResponse.json({ error: 'Internal Server Error' });
//     }
// }

// export {handler as POST, handler as GET};
