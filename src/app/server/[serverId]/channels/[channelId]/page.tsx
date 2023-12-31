import ChatHeader from '@/components/ChatHeader';
import { ChatMessages } from '@/components/ChatMassage';
import Chatinput from '@/components/Chatinput';
import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

async function page({
    params
}: ChannelIdPageProps) {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }
    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        },
    });

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        }
    });
    if (!channel || !member) {
        redirect("/");
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
            <ChatMessages
                member={member}
                name={channel.name}
                type='channel'
                apiUrl='/api/messages'
                socketUrl='/api/socket/messages'
                socketQuery={{
                    channelId: channel.id,
                    serverId: channel.serverId
                }}
                paramKey='channelId'
                paramValue={channel.id}
                chatId={channel.serverId}
            />
            <Chatinput
                name={channel.name}
                type='channel'
                apiUrl='/api/socket/messages'
                query={{
                    channelId: channel.id,
                    serverId: channel.serverId
                }}
            />
        </div>
    )
}

export default page