import connectMongoDB from '@/lib/mongodb';
import AccountDataModel, { AccountData } from '@/models/accountData'; // Assuming AccountData is exported from the model file
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
        });
        }
        currentAccount.locationId.push(locationId);
        await currentAccount.save(); 
        return new NextResponse("success", {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200, // OK status code
        });

    } 
  } catch (error) {
    console.error("Error:", error);
}
}

export {handler as POST, handler as GET}
