import { db } from "@/lib/db";

export const getUserByEmail = async (email: String) => {
  try {
    const user = await db.User.findUnique({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
};
