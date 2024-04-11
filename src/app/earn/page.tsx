'use client'
import CollectionSection from '@/app/earn/components/CollectionSection';
import React, { useState } from 'react';
import collection from "@/models/collection.json"

const Page = () => {
    const [checkCondition, setCheckCondition] = useState(false);
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

            <div className='grid lg:mx-6 w-full h-full lg:grid-cols-3 grid-rows-3 justify-center gap-5'>
                {collection.map((collectionItem, index) => {
                    return (
                        <CollectionSection
                            key={index}
                            CollectionId={collectionItem.CollectionId}
                            CollectionName={collectionItem.collectionName}
                            description={collectionItem.description}
                            image={collectionItem.image}
                            point={collectionItem.point}
                            locationId={collectionItem.locationId}
                            checkCondition={checkCondition}
                            setCheckCondition={setCheckCondition}
                        />
                    )
                })}
                
            </div>
            {checkCondition && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white w-[30%] h-[30%] flex flex-col items-center justify-center rounded-lg p-8">
                    <h1 className="text-2xl font-bold mb-4">
                    Congratulations!
                    </h1>
                    <p className="text-center">
                    You have successfully received rewards!
                    </p>
                    <button onClick={() => setCheckCondition(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                    Close
                    </button>
                </div>
                </div>
            )}
        </>
    );
};

export default Page;
