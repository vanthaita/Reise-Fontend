'use client'
import React, { useState, useEffect } from 'react';

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
import Image from 'next/image';
interface DropDetailProps {
  selectedLocation: Location;
  isDrawerVisible: boolean;
  setIsDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isTransitionSucess: boolean;
  setIsTransitionSucess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Detail: React.FC<DropDetailProps> = ({
  selectedLocation,
  isDrawerVisible,
  setIsDrawerVisible,
  isTransitionSucess,
  setIsTransitionSucess
}) => {
  const account = useCurrentAccount();
  const wallet = useCurrentWallet();
  const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
  const [distance, setDistance] = useState<string | undefined>(undefined); 
  const positionCurrent: Position | null = useGeolocation();
  const [checkIsDistance, setCheckIsDistance] = useState(false);
  const [checkIsCollected, setcheckIsCollected] = useState(false);
  const latitude: number = positionCurrent?.latitude ?? 0;
  const longitude: number = positionCurrent?.longitude ?? 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/getlocation", {
          address: account?.address,
          locationId: selectedLocation.locationId
        });
        console.log(res);
        setcheckIsCollected(res.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    if(wallet.isConnected) {
      fetchData(); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation, account?.address]);

  useEffect(() => {
    if (positionCurrent && selectedLocation) {
      const distance: number = calculateDistance(
        latitude,
        longitude,
        selectedLocation.lat,
        selectedLocation.lng
      );
      console.log(distance);
      const distanceToKm: string = convertDistance(distance); 
      if (!isNaN(parseFloat(distanceToKm))) {
        const distanceInKm: number = parseFloat(distanceToKm);
        if (distanceInKm > 0.03) { 
          setCheckIsDistance(true);
        } else {
          setCheckIsDistance(false);
        }
        setDistance(distanceToKm);
      } else {
        console.error('Distance is not a valid number.'); 
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionCurrent ,selectedLocation]);

  console.log(selectedLocation);
  console.log(distance)
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
              setIsTransitionSucess(false);
            },
            onSuccess: async (result) => {
              try {
                const res = await axios.post("http://localhost:3000/api/setLocation", {
                    address: account?.address,
                    locationId: selectedLocation.locationId
                }) 
                setIsDrawerVisible(false);
                // setIsTransitionSucess(true);
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
    <>
      
      <div className="fixed inset-0 flex items-center justify-center mt-16 z-[4] p-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-sm flex flex-col mx-2" onClick={handleStopPropagation}>
          <div className="p-6 flex justify-between items-center">
            <div className='flex flex-col justify-center'>
              <div className=' flex flex-row items-center justify-between'>
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
            <div className=' rounded-xl w-[22rem] h-[14rem] mb-2'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedLocation.image}
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
              {wallet.isConnected ? (
                checkIsCollected ? (
                  <Button disabled>Collected</Button>
                ) : checkIsDistance ? (
                  <Button className='w-[30%]' onClick={handleTransaction}>
                    Collect
                  </Button>
                ) : (
                  <Button className='w-[50%]'>Go closer to collect</Button>
                )
              ) : (
                <Button disabled>Connect your wallet!</Button>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Detail;
