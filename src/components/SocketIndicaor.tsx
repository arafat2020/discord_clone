"use client"

import { useSocket } from '@/provider/SockeProvider'
import React from 'react'
import { Badge } from './ui/badge'

function SocketIndicaor() {
    const {isConnected} = useSocket()
    if (!isConnected) {
        return (
          <Badge 
            variant="outline" 
            className="bg-yellow-600 text-white border-none"
          >
           Connecting
          </Badge>
        )
      }
    
      return (
        <Badge 
          variant="outline" 
          className="bg-emerald-600 text-white border-none"
        >
          Connected
        </Badge>
      )
}

export default SocketIndicaor