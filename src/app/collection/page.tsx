'use client'
import CollectionSection from '@/app/earn/components/CollectionSection';
import React , {useEffect,useState} from 'react';
import collection from "@/models/collection.json"
import { useCurrentAccount } from '@mysten/dapp-kit';
import axios from 'axios';
import locations from '@/models/locations.json'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {
    const account = useCurrentAccount();
    const router = useRouter();
    if(!account?.address) {
        router.push(`/`);
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
                    <h1 className='font-bold lg:text-3xl text-xl text-black mb-4'>Your Collection</h1>
                </div>
            </div>

            <div className='grid lg:mx-6 w-full h-full lg:grid-cols-3 justify-center mb-10'>
            {filteredLocations && filteredLocations.map(locationItem => (
                <div className='flex flex-col items-center  justify-center w-[320px] h-[384px] bg-white-300 rounded-sm shadow-md p-4 lg:ml-16' key={locationItem.locationId}>
                <div className=' flex flex-col justify-center items-center'>
                    <p className=' font-bold text-lg text-center'>
                        {locationItem.localName}
                    </p>
                    <p className=' font-medium text-xs'>
                        {locationItem.address}
                    </p>

                </div>
                <div className=' bg-black w-[16rem] h-[12rem] mt-4 rounded-xl'>
                    <Image 
                        src="/images/HCM.jpg"
                        alt='image'
                        width={256}
                        height={192}
                        className=' rounded-xl w-full h-full'
                    />
                </div>
                </div>
            ))}

            </div>

        </>
    );
};

export default Page;
