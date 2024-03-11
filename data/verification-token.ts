import { db } from "@/lib/db";
import { any } from "zod";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verficationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verficationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verficationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verficationToken;
  } catch {
    return null;
  }
};
