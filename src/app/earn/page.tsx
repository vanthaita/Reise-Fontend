'use client'
import CollectionSection from '@/components/CollectionSection';
import React from 'react';

const Page = () => {
    return (
        <>
            <div className='lg:flex w-full h-full items-center justify-center'>
                <div className='lg:w-1/2 p-[1.5rem] flex flex-col items-center'>
                    <h1 className='font-bold lg:text-3xl text-xl text-black mb-4'>Earn For Your Collection</h1>
                    <p className='text-gray-600 lg:text-xl text-xs'>
                        Collect unique items, complete challenges, and unlock rewards!
                    </p>
                </div>
            </div>

            <div className='grid lg:mx-6 w-full h-full lg:grid-cols-3 grid-rows-3 justify-center'>
                <CollectionSection 
                    title="Collection 1"
                    description="Explore rare artifacts, solve puzzles, and earn exclusive rewards in Collection 1." image={''}                />
                    <CollectionSection 
                    title="Collection 2"
                    description="Explore rare artifacts, solve puzzles, and earn exclusive rewards in Collection 1." image={''}                />
                    <CollectionSection 
                    title="Collection 3"
                    description="Explore rare artifacts, solve puzzles, and earn exclusive rewards in Collection 1." image={''}                />
            

            <CollectionSection 
                    title="Collection 1"
                    description="Explore rare artifacts, solve puzzles, and earn exclusive rewards in Collection 1." image={''}                />
                    <CollectionSection 
                    title="Collection 2"
                    description="Explore rare artifacts, solve puzzles, and earn exclusive rewards in Collection 1." image={''}                />
                    <CollectionSection 
                    title="Collection 3"
                    description="Explore rare artifacts, solve puzzles, and earn exclusive rewards in Collection 1." image={''}                />
            

            <CollectionSection 
                    title="Collection 1"
                    description="Explore rare artifacts, solve puzzles, and earn exclusive rewards in Collection 1." image={''}                />
                    <CollectionSection 
                    title="Collection 2"
                    description="Explore rare artifacts, solve puzzles, and earn exclusive rewards in Collection 1." image={''}                />
                    <CollectionSection 
                    title="Collection 3"
                    description="Explore rare artifacts, solve puzzles, and earn exclusive rewards in Collection 1." image={''}                />
            
            </div>
        </>
    );
};

export default Page;
