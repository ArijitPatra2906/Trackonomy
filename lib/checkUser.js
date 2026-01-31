import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // Create name, handling cases where firstName or lastName might be null
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || "User";

    // Ensure email exists
    if (!user.emailAddresses || user.emailAddresses.length === 0) {
      console.error("User has no email addresses");
      return null;
    }

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl || "",
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error.message);
    throw error;
  }
};
