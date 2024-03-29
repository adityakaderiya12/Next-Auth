"use server";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerficationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import * as z from "zod";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, name } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in Use!" };
  }
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  //Todo: send Verification token email
  await sendVerficationEmail(verificationToken.email, verificationToken.token);
  return { success: "Confirmation email sent!" };
};
