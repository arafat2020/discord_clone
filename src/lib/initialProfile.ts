import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { ObjectId } from "bson";

export const initialProfile = async () => {
    const id = new ObjectId()
    const user = await currentUser();

    if (!user) {
        return redirectToSignIn();
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    if (profile) {
        return profile;
    }

    const newProfile = await db.profile.create({
        data: {
            id: `${id}`,
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });

    return newProfile;
};