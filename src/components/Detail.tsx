'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { calculateDistance,convertDistance } from '../functions/calculateDistance'; 
import { useGeolocation } from '../hooks/useGeoLocation'; 
import { Position } from '../types'; 
import { Location } from '@/types';
import {
  ConnectButton,
	useCurrentAccount,
	useCurrentWallet,
	useSignAndExecuteTransactionBlock,
} from '@mysten/dapp-kit';
import { createMintNftTxnBlock } from '@/lib/moveCall';
import axios from 'axios'

interface DropDetailProps {
  selectedLocation: Location;
  isDrawerVisible: boolean;
  setIsDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Detail: React.FC<DropDetailProps> = ({
  selectedLocation,
  isDrawerVisible,
  setIsDrawerVisible,
}) => {
  const account = useCurrentAccount();
  const wallet = useCurrentWallet();
  const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
  const [distance, setDistance] = useState<string | undefined>(undefined); // Initialize distance state
  const positionCurrent: Position | null = useGeolocation();
  const [checkIsDistance, setCheckIsDistance] = useState(false);
  const latitude: number = positionCurrent?.latitude ?? 0;
  const longitude: number = positionCurrent?.longitude ?? 0;
  useEffect(() => {
    if (positionCurrent && selectedLocation) {
      const distance: number = calculateDistance(
        latitude,
        longitude,
        selectedLocation.lat,
        selectedLocation.lng
      );
      const distanceToKm: string = convertDistance(distance); 
      if (!isNaN(parseFloat(distanceToKm))) {
        const distanceInKm: number = parseFloat(distanceToKm);
        if (distanceInKm < 0.03) { 
          setCheckIsDistance(true);
        } else {
          setCheckIsDistance(false);
        }
        setDistance(distanceToKm);
      } else {
        console.error('Distance is not a valid number.'); 
      }
    }
  }, [positionCurrent, selectedLocation]);


  if (!selectedLocation || !isDrawerVisible) {
    return null;
  }

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
  };
  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const handleTransaction = async () => {
    if (!wallet.isConnected) return;
    

    const { address, category, description, image, lat, lng, localName, collectionName } = selectedLocation;

    const txb = createMintNftTxnBlock({
        _name: localName,
        _description: description,
        _url: image,
        _lat: lat.toString(),
        _lng: lng.toString(),
        _category: category,
        _creator: account?.address || "",
        _address_local: address,
        _collection_name: collectionName,
    });

    try {
        const res = await signAndExecuteTransactionBlock({
            transactionBlock: txb,
            chain: "sui:devnet",
        }, {
            onError: () => {
                console.log("error");
            },
            onSuccess: async (result) => {
              try {
                const res = await axios.post("http://localhost:3000/api/location", {
                    address: account?.address,
                    locationId: selectedLocation.locationId
                }) 
              } catch (err) {
                console.error(err);
              }

            }
        });
        res;
    } catch (err) {
        console.log(err);
    }
} 

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-sm flex flex-col" onClick={handleStopPropagation}>
        <div className="p-4 flex justify-between items-center">
          <div className='flex flex-col justify-center'>
            <div className=' flex flex-row justify-between items-center'>
              <h1 className="text-black text-lg font-bold">{selectedLocation.localName}</h1>
              <button onClick={handleCloseDrawer} className="focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-black text-sm">{selectedLocation.address}</p>
          </div>
        </div>
        <div className="flex items-center flex-col gap-2 p-4">
          <div className=' rounded-xl w-[20rem] h-[14rem] mb-2'>
            <Image 
              src='/images/images.png'
              alt='image'
              width={288}
              height={224}
              className='rounded-xl w-full h-full'
            />
          </div>
          <div className=' flex flex-col justify-center'>
            <p className=" text-sm font-medium leading-4">{selectedLocation.description}</p>
            <p className="text-xs font-normal leading-4">Category: {selectedLocation.category}</p>
          </div>
          <div className=' flex flex-row justify-between items-center gap-2 w-full p-4'>
            <p className=' text-black'>{distance}</p>
              {checkIsDistance 
              
              ? (wallet.isConnected && <Button className=' w-[30%]' onClick={handleTransaction}>
                Collect
              </Button>) : 
                <Button className=' w-[50%]'>
                  Go closer to collect
                </Button>  
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
