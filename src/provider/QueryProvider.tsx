"use client"
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const QueryProvider = ({children}:{children:React.ReactNode})=>{
const [queryCliemt] = useState(()=> new QueryClient())
return (
    <QueryClientProvider client={queryCliemt}>
        {children}
    </QueryClientProvider>
)
}