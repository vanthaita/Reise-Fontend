'use client'
import React, { useEffect, useState } from 'react';
import collection from '@/models/collection.json';
import location from '@/models/locations.json';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCurrentAccount } from '@mysten/dapp-kit';
import axios from 'axios';

const Page = ({ params }: { params: any }) => {
    const account = useCurrentAccount();
    const [collectedLocation, setCollectedLocation] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post("http://localhost:3000/api/getAllLocation", {
                    address: account?.address})
                console.log(res.data)
                setCollectedLocation(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const collectionId = params.collectionID;
    const filteredCollection = collection.filter(item => item.CollectionId === collectionId);
    console.log(collectedLocation);
    const locationIds = filteredCollection.map(item => item.locationId).flat(); 
    const filteredLocations = location.filter(item => locationIds.includes(item.locationId));

    return (
        <>
            <div className='lg:flex w-full h-1/2 items-center justify-center p-4'>
                {filteredCollection.map(collectionItem => (
                    <div key={collectionItem.CollectionId} className=' flex flex-col justify-center items-center'>
                        <h1 className=' font-bold text-xl'>{collectionItem.collectionName}</h1>
                        <p className=' font-medium text-lg'>{collectionItem.description}</p>
                    </div>
                ))}
            </div>

            <div className='grid lg:mx-6 w-full h-full lg:grid-cols-3 grid-rows-3 justify-center gap-2 gap-2 items-center'>
                {filteredLocations.map(locationItem => (
                    <div className='flex flex-col items-center justify-center w-[320px] h-[384px] bg-white-300 rounded-sm shadow-md p-4 lg:ml-16' key={locationItem.locationId}>
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
                                className=' rounded-xl'
                            />
                        </div>

                        {/* Render "Collect" or "Collected" button based on collectedLocation */}
                        {/* {collectedLocation.includes(locationItem.locationId) ? 
                            <Button className=' w-[256px] mt-4' disabled>Collected</Button> :
                            <Button className=' w-[256px] mt-4'>Collect</Button>
                        } */}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Page;
