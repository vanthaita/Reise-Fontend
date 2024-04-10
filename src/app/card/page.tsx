'use client'
import React , {useEffect,useState} from 'react';
import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import axios from 'axios';
import locations from '@/models/locations.json'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const Page = () => {
    const account = useCurrentAccount();
    const wallet = useCurrentWallet();
    const router = useRouter();
    if (typeof window !== 'undefined') {
        if (wallet.isDisconnected) {
            router.push(`/`);
        }
    }
    const [collectedLocation, setCollectedLocation] = useState<string[]>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post("http://localhost:3000/api/getAllLocation", {
                    address: account?.address
                })
                setCollectedLocation(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [account?.address]);
    
    const filteredLocations = locations.filter(location => collectedLocation?.includes(location.locationId));

    return (
        <>
            <div className='lg:flex w-full h-1/2 items-center justify-center'>
                <div className='lg:w-1/2 p-[1.5rem] flex flex-col items-center'>
                    <h1 className='font-bold lg:text-3xl text-xl text-black mb-4'>Your Card</h1>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 lg:gap-6 justify-center mb-10'>
                {filteredLocations && filteredLocations.map(locationItem => (
                    <div className='flex flex-col items-center bg-white rounded-xl shadow-md w-[20rem] h-[25rem] mb-6 lg:mx-[5.2rem]' key={locationItem.locationId}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={locationItem.image} alt='image' width='320' height='192' className='rounded-t-xl w-full h-full' />
                    <div className='flex flex-col justify-center p-4'>
                        <p className='font-bold text-lg text-center mb-2'>
                            {locationItem.localName}
                        </p>
                        <p className='font-medium text-xs text-center'>
                            {locationItem.address}
                        </p>
                        <div className='flex flex-col justify-center items-start p-4'>
                            <p className='font-medium text-xs'>
                                Category: {locationItem.category}
                            </p>
                            <p className='font-medium text-xs'>
                                Collection: {locationItem.collectionName}
                            </p>
                        </div>
                    </div>
                </div>
                
                ))}
            </div>


        </>
    );
};

export default Page;
