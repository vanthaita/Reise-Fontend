import connectMongoDB from '@/lib/mongodb';
import AccountDataModel from '@/models/accountData'; 
import { accountData } from '@/types';
import { NextResponse } from 'next/server';

async function handler(req: Request, res: Response) {
  try {
    await connectMongoDB();
    if (req.method === 'POST') {
      const body = await req.json();
      const { address, locationId } = body as accountData;

      const currentAccount = await AccountDataModel.findOne({ address }); 
      if (!currentAccount) {
        const newAccount = await AccountDataModel.create({
          address,
          locationId,
          point: 0,
        });
        }

        currentAccount.locationId.push(locationId);
        await currentAccount.save(); 
        return new NextResponse("success", {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200, 
        });
    } 
  } catch (error) {
    console.error("Error:", error);
}
}

export {handler as POST, handler as GET}
