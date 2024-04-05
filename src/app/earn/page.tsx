'use client'
import CollectionSection from '@/app/earn/components/CollectionSection';
import React from 'react';
import collection from "@/models/collection.json"

const Page = () => {

    return (
        <>
            <div className='lg:flex w-full h-1/2 items-center justify-center'>
                <div className='lg:w-1/2 p-[1.5rem] flex flex-col items-center'>
                    <h1 className='font-bold lg:text-3xl text-xl text-black mb-4'>Earn For Your Collection</h1>
                    <p className='text-gray-600 lg:text-xl text-xs'>
                        Collect unique items, complete challenges, and unlock rewards!
                    </p>
                </div>
            </div>

            <div className='grid lg:mx-6 w-full h-full lg:grid-cols-3 grid-rows-3 justify-center'>
                {collection.map((collectionItem, index) => {
                    return (
                        <CollectionSection
                            key={index}
                            CollectionId={collectionItem.CollectionId}
                            CollectionName={collectionItem.collectionName}
                            description={collectionItem.description}
                            image={collectionItem.image}
                            point={collectionItem.point}
                        />
                    )
                })}
            </div>

        </>
    );
};

export default Page;
