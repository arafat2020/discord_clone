import InitialModel from "@/components/Models/InitialModel"
import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initialProfile"
import {redirect} from "next/navigation"


export default async function Home() {
  const profile = await initialProfile()
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })
  if (server) redirect(`/server/${server.id}`)
  return (
   <InitialModel/>
  )
}
