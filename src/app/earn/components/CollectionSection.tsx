'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import { useCurrentAccount } from '@mysten/dapp-kit';
import axios from 'axios';
import collection from '@/models/collection.json';

type Props = {
    CollectionId: string,
    CollectionName: string,
    description: string,
    image: string,
    point: number
}
const CollectionSection = ({ CollectionName, description, image, CollectionId, point }: Props) => {
    const router = useRouter();
    const [selectedLCollection, setSelectedLocation] = useState<string>();
    const account = useCurrentAccount();
    const [collectedLocation, setCollectedLocation] = useState<string[]>();
    const [checkallCollectionsIncluded, setCheckallCollectionsIncluded] = useState(false);
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
        // Doi nguoc lai
        const filteredLocations = collection.filter((collectionItem) =>
            collectedLocation?.every((id) => collectionItem.locationId.includes(id))
        );

        const allCollectionsIncluded = filteredLocations.length === collection.length;
        setCheckallCollectionsIncluded(allCollectionsIncluded);
    }, [account?.address]);
    
    

    console.log(checkallCollectionsIncluded);
    const handleRewards = async () => {
        if(!checkallCollectionsIncluded) return console.log("Can't receive Rewards");
        try {
            const req = await axios.post("http://localhost:3000/api/setPoint", {
                address: account?.address,
                point: point
            })
            console.log(req.data);
        } catch (err) {
            console.log(err);
        }   
    }
    const handleselectedLCollection = () => {
        setSelectedLocation(CollectionId);
        router.push(`/earn/${CollectionId}`);
    }

    return (
        <div className='bg-white-300 p-4 rounded-md shadow-md flex flex-col gap-5 lg:h-[80%] lg:w-[24rem] h-[20rem] w-[350px] '>
            <div className=' flex flex-col justify-center items-center'>
                <h2 className='text-lg font-semibold text-center'>{CollectionName}</h2>
                <p className='text-gray-700'>{description}</p>
            </div>
            <div className=' w-full h-[55%] cursor-pointer' onClick={handleselectedLCollection}>
                <Image
                    src="/images/HCM.jpg"
                    alt='Image Collection'
                    width={200}
                    height={200}
                    className=' h-full w-full '
                />
            </div>
            <Button className=' bg-black text-white' onClick={handleRewards}>Rewards</Button>
        </div>
    );
};
export default CollectionSection;
