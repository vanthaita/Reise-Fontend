'use client'
import React, { useEffect, useState } from 'react';
import collection from '@/models/collection.json';
import location from '@/models/locations.json';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCurrentAccount } from '@mysten/dapp-kit';
import axios from 'axios';
import Link from 'next/link';

const Page = ({ params }: { params: any }) => {
    const account = useCurrentAccount();
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

    const collectionId = params.collectionID;
    const filteredCollection = collection.filter(item => item.CollectionId === collectionId);
    const locationIds = filteredCollection.map(item => item.locationId).flat();
    const filteredLocations = location.filter(item => locationIds.includes(item.locationId));
    
    return (
        <>
            <div className='lg:flex w-full h-1/2 items-center justify-center p-8'>
                {filteredCollection.map(collectionItem => (
                    <div key={collectionItem.CollectionId} className=' flex flex-col justify-center items-center'>
                        <h1 className=' font-bold text-xl'>{collectionItem.collectionName}</h1>
                        <p className=' font-medium text-lg'>{collectionItem.description}</p>
                    </div>
                ))}
            </div>

            <div className='grid lg:mx-6 w-full h-full lg:grid-cols-3 grid-rows-3 justify-center gap-2 items-center'>
                {filteredLocations.map(locationItem => (
                    <div className='flex flex-col items-center bg-white rounded-xl shadow-md w-[20rem] h-[28.5rem] mb-6 lg:mx-[3.8rem] justify-center' key={locationItem.locationId}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <Image 
                            src={locationItem.image}
                            alt='image'
                            width={320}
                            height={192}
                            className='rounded-t-xl w-full h-full'
                        />
                        <div className='flex flex-col justify-center p-4'>
                            <p className='font-bold text-lg text-center mb-2'>
                                {locationItem.localName}
                            </p>
                            <p className='font-medium text-xs text-center'>
                                {locationItem.address}
                            </p>
                            <div className=' flex flex-col justify-center items-start p-4'>
                                <p className='font-medium text-xs'>
                                    Category: {locationItem.category}
                                </p>
                                <p className='font-medium text-xs'>
                                    Collection: {locationItem.collectionName}
                                </p>    
                            </div>
                    </div>
                    {collectedLocation && collectedLocation.includes(locationItem.locationId) ? 
                            <Button className='w-[256px] p-4 mb-6' disabled>Collected</Button> :
                            <Link href='/map'>
                                <Button className='w-[256px] p-4 mb-6'>Collect</Button>
                            </Link>
                        }
                </div>
                ))}
            </div>
        </>
    );
};

export default Page;
