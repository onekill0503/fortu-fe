import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { useEffect, useState } from "react";
import { request } from 'graphql-request';
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { gql } from "graphql-request";

const queryWithdraw = gql`{
    withdraws(orderBy: blockTimestamp, orderDirection: desc) {
        id
        blockTimestamp
        blockNumber
        amount
        transactionHash
        user
    }
}`

interface Withdraw {
    id: string
    blockTimestamp: string
    blockNumber: string
    amount: string
    transactionHash: string
    user: string
}

type QueryData = {
    withdraws: Withdraw[];
};

export default function TableWithdraw() {
    const [hasMounted, setHasMounted] = useState(false);
    const { address } = useAccount();

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const url = 'https://api.studio.thegraph.com/query/91582/jackramp-avs/version/latest';

    const { data, isLoading, refetch } = useQuery<QueryData>({
        queryKey: ['data'],
        queryFn: async () => {
            return await request(url, queryWithdraw);
        },
        refetchInterval: 10000,
    });

    const handleRefresh = () => {
        refetch();
    };

    const filteredMints = data?.withdraws && address ? data?.withdraws.filter((mint: Withdraw) => mint.user.toLocaleLowerCase() === address.toLocaleLowerCase()) : [];

    if (!hasMounted) {
        return null;
    }

    return (
        <div className="w-full h-auto z-10">
            <DataTable
                data={filteredMints || []}
                columns={columns()}
                handleRefresh={handleRefresh}
                isLoading={isLoading}
            />
        </div>
    );
}
