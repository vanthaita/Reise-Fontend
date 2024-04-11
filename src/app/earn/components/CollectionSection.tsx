'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import axios from 'axios';
import Image from 'next/image';
import collection from "@/models/collection.json"

type Props = {
    CollectionId: string;
    CollectionName: string;
    description: string;
    image: string;
    point: number;
    locationId: string[];
}

const CollectionSection: React.FC<Props> = ({ CollectionName, description, image, CollectionId, point, locationId }: Props) => {
    const router = useRouter();
    const [selectedCollection, setSelectedCollection] = useState<string>();
    const account = useCurrentAccount();
    const [collectedLocations, setCollectedLocations] = useState<string[]>([]);
    const [checkAllCollectionsIncluded, setCheckAllCollectionsIncluded] = useState(false);
    const [checkIsRewarded, setCheckIsRewarded] = useState(false);
    const [listRewardId, setListRewardId] = useState<string[]>([]);
    const [checkCondition, setCheckCondition] = useState(false);
    const [isLoadingReward, setIsLoadingReward] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const wallet = useCurrentWallet();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(wallet.isConnected) {
                    const res = await axios.post<string[]>("http://localhost:3000/api/getAllLocation", {
                        address: account?.address
                    })
                    setCollectedLocations(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [account?.address, wallet.isConnected]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(wallet.isConnected) {
                    setIsLoadingReward(true); // Start loading rewards
                    const res = await axios.post<string[]>("http://localhost:3000/api/getReward", {
                        address: account?.address,
                    })
                    setListRewardId(res.data);
                    setCheckIsRewarded(res.data.includes(CollectionId));
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoadingReward(false); // Stop loading rewards
            }
        }
        if (wallet.isConnected)
            fetchData();
        else 
            setCheckIsRewarded(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account?.address]);

    const handleCheckReward = (CollectionId: string) : boolean => {
        const foundCollection = collection.find(collectionItem => collectionItem.CollectionId === CollectionId);
        if (!foundCollection) {
            console.log("Collection not found");
            return false;
        }
        const filteredLocationIds = foundCollection.locationId;
        return filteredLocationIds.every((locationId: string) => {
            return collectedLocations.includes(locationId);
        });
    }

    async function handleRewards() {
        setIsLoadingReward(true); 
        if (checkAllCollectionsIncluded) return;
        try {
            if (wallet.isConnected) {
                setCheckCondition(handleCheckReward(CollectionId));
                if (checkCondition) {
                    const res = await axios.post("http://localhost:3000/api/setPoint", {
                        address: account?.address,
                        point: point
                    });
                    const response = await axios.post("http://localhost:3000/api/setReward", {
                        address: account?.address,
                        CollectionId: CollectionId
                    });

                    setSuccessMessage('Reward successfully granted!');
                }
            }
            console.log(isLoadingReward);
        } catch (err) {
            console.log(err);
            setErrorMessage('Failed to process reward. Please try again.');
        } finally {
            setIsLoadingReward(false); // Stop loading rewards
        }
    }
    const handleSelectedCollection = () => {
        setSelectedCollection(CollectionId);
        router.push(`/earn/${CollectionId}`);
    }
    return (
        <div className='bg-white p-[2rem] rounded-xl shadow-md flex flex-col justify-center lg:w-[24rem] h-[65%] w-[350px] lg:mx-[2rem] gap-10' key={CollectionId}>
            <div className='flex flex-col justify-center items-center'>
                <h2 className=' text-2xl font-bold text-center'>{CollectionName}</h2>
                <p className='text-gray-700 text-[12px]'>{description}</p>
            </div>
            
            <div className='w-full h-[50%] cursor-pointer relative'>
                
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={image}
                    alt='Image Collection'
                    width={384}
                    height={160}
                    className=' w-full h-full rounded-md'
                />
                <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-md ">
                    <Button className="text-white font-semibold" onClick={handleSelectedCollection}>View Collection</Button>
                </div>
            </div>
            {!checkIsRewarded ? 
                <Button
                className='bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300'
                onClick={handleRewards}
                disabled={isLoadingReward}
            >
                {(isLoadingReward) ? 'Loading...' : 'Reward'}
            </Button>
                : <Button className="bg-gray-300 text-gray-600 py-2 rounded-md cursor-not-allowed" disabled>Rewarded</Button>
            }

            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
            
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </div>

    );
};

export default CollectionSection;
