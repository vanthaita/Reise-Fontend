'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import axios from 'axios';

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
    const wallet = useCurrentWallet();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post<string[]>("http://localhost:3000/api/getAllLocation", {
                    address: account?.address
                })
                setCollectedLocations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [account?.address]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post<string[]>("http://localhost:3000/api/getReward", {
                    address: account?.address,
                })
                setListRewardId(res.data);
                setCheckIsRewarded(res.data.includes(CollectionId));
            } catch (err) {
                console.log(err);
            }
        }
        if (wallet.isConnected)
            fetchData();
        else 
            setCheckIsRewarded(false)
    }, [account?.address]);

    async function handleRewards() {
        if (checkAllCollectionsIncluded) return;
        try {
            const res = await axios.post("http://localhost:3000/api/setPoint", {
                address: account?.address,
                point: point
            });
            const response = await axios.post("http://localhost:3000/api/setReward", {
                address: account?.address,
                CollectionId: CollectionId
            });
            console.log(response.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSelectedCollection = () => {
        setSelectedCollection(CollectionId);
        router.push(`/earn/${CollectionId}`);
    }

    return (
        <div className='bg-white-300 p-4 rounded-md shadow-md flex flex-col gap-5 lg:h-[80%] lg:w-[24rem] h-[20rem] w-[350px] '>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-lg font-semibold text-center'>{CollectionName}</h2>
                <p className='text-gray-700'>{description}</p>
            </div>
            <div className='w-full h-[55%] cursor-pointer' onClick={handleSelectedCollection}>
                <Image
                    src='/images/HCM.jpg'
                    alt='Image Collection'
                    width={200}
                    height={200}
                    className='h-full w-full'
                />
            </div>
            {!checkIsRewarded ? <Button className='bg-black text-white' onClick={handleRewards}>Reward</Button>
                : <Button  disabled>Rewarded</Button>
            }
        </div>
    );
};

export default CollectionSection;
