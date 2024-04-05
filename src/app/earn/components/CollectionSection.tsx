'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
type Props = {
    CollectionId: string,
    CollectionName: string,
    description: string,
    image: string,
}
const CollectionSection = ({ CollectionName, description, image, CollectionId }: Props) => {
    const router = useRouter();
    const [selectedLCollection, setSelectedLocation] = useState<string>();


    const handleselectedLCollection = () => {
        setSelectedLocation(CollectionId);

        router.push(`/earn/${CollectionId}`);
    }

    const handleGetRewards = () => {
            
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
            <Button className=' bg-black text-white' onClick={handleGetRewards}>Rewards</Button>
        </div>
    );
};
export default CollectionSection;
