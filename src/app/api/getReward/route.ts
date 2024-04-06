import connectMongoDB from '@/lib/mongodb';
import AccountDataModel from '@/models/accountData'; 
import { NextResponse } from 'next/server';
async function handler(req: Request) {
    try {   
        if (req.method !== 'POST') {
            return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
                headers: {
                  "Content-Type": "application/json",
                },
                status: 500,
              }); 
        }      
        await connectMongoDB();

        const body = await req.json();
        const {
            address,
        } = body;
        const currentAccount = await AccountDataModel.findOne({ address }); 
        if (!currentAccount) {
            return new NextResponse(JSON.stringify({ error: 'Not exist account' }), {
                headers: {
                  "Content-Type": "application/json",
                },
                status: 500,
              }); 
        }
        return new NextResponse(JSON.stringify(currentAccount.receivedRewardsId), {
          headers: {
              "Content-Type": "application/json",
          },
          status: 200,
      });

    } catch(error) {
        console.error("Error:", error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
            headers: {
              "Content-Type": "application/json",
            },
            status: 500,
          });
    }
}
export {handler as POST}