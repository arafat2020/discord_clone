import qs from 'query-string'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSocket } from '@/provider/SockeProvider'

interface ChatQueryProps {
    queryKey: string,
    apiUrl: string,
    paramKey: "channelId" | "conversationId"
    paramValue: string,

}

export const useChaQuery = ({ queryKey
    , apiUrl,
    paramKey,
    paramValue }: ChatQueryProps) => {
    const { isConnected } = useSocket()
    const fetchMassage = async ({ pageParam = undefined }) => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey]: paramValue
            }
        }, { skipNull: true })
        const res = await fetch(url);
        return res.json();
    }
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
     } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMassage,
        getNextPageParam: (lastpage) => lastpage?.nextCursor,
        refetchInterval: isConnected ? false : 1000
    })
    return{
        data,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        status
    }
}

