import connectMongoDB from '@/lib/mongodb';
import AccountDataModel from '@/models/accountData'; 
import { NextResponse } from 'next/server';
import { AccountData } from '@/types';
async function handler(req: Request) {
  try {
    await connectMongoDB();
    if (req.method === 'POST') {
      const body = await req.json();
      const { address, CollectionId } = body;

      const currentAccount = await AccountDataModel.findOne({ address }); 

      if (!currentAccount) {
        return new NextResponse(JSON.stringify({ error: 'Not exist account' }), {
            headers: {
              "Content-Type": "application/json",
            },
            status: 500,
          }); 
        }

        const existingReward = await AccountDataModel.findOne({
            address,
            locationId: { $in: [CollectionId] }
          });
          if (!existingReward) {
            currentAccount.receivedRewardsId.push(CollectionId);
            await currentAccount.save(); 
            return new NextResponse("success", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 200, 
            });
        }
    } 
  } catch (error) {
    console.error("Error:", error);
}
}

export {handler as POST, handler as GET}
