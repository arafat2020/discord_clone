import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client"
import { ObjectId } from "bson"
import { NextResponse } from "next/server"
import { v4 as uuid } from 'uuid'

export async function POST(req: Request) {
    const id = new ObjectId()
    try {
        const { name, imageUrl } = await req.json()
        const profile = await currentProfile()
        if (!profile) {
            throw new NextResponse("Unauthrized", { status: 401 })
        }
        const server = await db.server.create({
            data: {
                id: `${id}`,
                name,
                imageUrl,
                profileId: profile.id,
                inviteCode: uuid(),
                channels: {
                    create: [
                        {
                            id: `${id}`,
                            name: 'general',
                            profileId: profile.id
                        }]
                },
                members: {
                    create: [
                        {
                            id: `${id}`,
                            profileId: profile.id,
                            role: MemberRole.ADMIN
                        }
                    ]
                }
            }
        })
        return NextResponse.json(server)
    } catch (error) {
        console.log(error);

        throw new NextResponse("Error from server", { status: 500 })
    }
}