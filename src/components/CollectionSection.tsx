'use client'
import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
type Props = {
    title: string,
    description: string,
    image: string,
}


const CollectionSection = ({ title, description }: Props) => {
    return (
        <div className='bg-white-300 p-4 rounded-md shadow-md flex flex-col gap-5 lg:h-[80%] lg:w-[450px] h-[80%] w-[350px]'>
            <h2 className='text-lg font-semibold mb-2'>{title}</h2>
            <p className='text-gray-700'>{description}</p>
            <div className=' w-full h-[55%]'>
            <Image
                src="/images/images.png"
                alt='Image Collection'
                width={200}
                height={200}
                className=' h-full w-full '
            />
            </div>
            <Button>Rewards</Button>
        </div>
    );
};

export default CollectionSection;
