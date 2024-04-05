import connectMongoDB from '@/lib/mongodb';
import AccountDataModel from '@/models/accountData'; 
import { accountData } from '@/types';
import { NextResponse } from 'next/server';

async function handler(req: Request, res: Response) {
  try {
    await connectMongoDB();
    if (req.method === 'POST') {
      const body = await req.json();
      const { address, point } = body as accountData;

      const currentAccount = await AccountDataModel.findOne({ address }); 
      if (!currentAccount) {
        return new NextResponse(JSON.stringify({ error: 'Not exist account' }), {
            headers: {
              "Content-Type": "application/json",
            },
            status: 500,
          }); 
    }

        currentAccount.point = currentAccount.point + point;
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
