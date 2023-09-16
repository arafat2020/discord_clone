import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";
import { ObjectId } from "bson";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
};

const InviteCodePage = async ({
  params
}: InviteCodePageProps) => {
    const id = new ObjectId
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (existingServer) {
    return redirect(`/server/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            id:`${id}`,
            profileId: profile.id,
          }
        ]
      }
    }
  });

  if (server) {
    return redirect(`/server/${server.id}`);
  }
  
  return null;
}
 
export default InviteCodePage;