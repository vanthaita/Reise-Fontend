import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useCurrentAccount } from '@mysten/dapp-kit';

interface CollectedLocationContextType {
    collectedLocation: string[] | undefined;
}

const CollectedLocationContext = createContext<CollectedLocationContextType>({
    collectedLocation: undefined,
});

export const CollectedLocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const account = useCurrentAccount();
    const [collectedLocation, setCollectedLocation] = useState<string[] | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post<string[]>("http://localhost:3000/api/getAllLocation", {
                    address: account?.address
                });
                setCollectedLocation(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [account?.address]);

    return (
        <CollectedLocationContext.Provider value={{ collectedLocation }}>
            {children}
        </CollectedLocationContext.Provider>
    );
};

export const useCollectedLocation = () => {
    const { collectedLocation } = useContext(CollectedLocationContext);
    if (collectedLocation === undefined) {
        throw new Error('useCollectedLocation must be used within a CollectedLocationProvider');
    }
    return collectedLocation;
};
