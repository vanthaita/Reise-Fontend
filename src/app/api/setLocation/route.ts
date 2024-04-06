import connectMongoDB from '@/lib/mongodb';
import AccountDataModel from '@/models/accountData'; 
import { NextResponse } from 'next/server';
import { AccountData } from '@/types';
async function handler(req: Request, res: Response) {
  try {
    await connectMongoDB();
    if (req.method === 'POST') {
      const body = await req.json();
      const { address, locationId } = body as AccountData;

      const currentAccount = await AccountDataModel.findOne({ address }); 
      const receivedRewardsId: string[] = [];
      if (!currentAccount) {
        const newAccount = await AccountDataModel.create({
          address,
          locationId,
          point: 0,
          receivedRewardsId,
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
