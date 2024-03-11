"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerficationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError, User } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  //If Exising users and email and pwd not available in database
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid Credentials!" };
  }
  //If existing user email is not verified generate the token
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerficationEmail(
      verificationToken.email,
      verificationToken.token
    );
  }
  return { success: "confirmation email sent!" };
};
