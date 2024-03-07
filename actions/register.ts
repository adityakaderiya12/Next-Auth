"use server";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";

import { db } from "@/lib/db";
import * as z from "zod";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, name } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.User.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return { error: "Email already in Use!" };
  }
  await db.User.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  //Todo: send Verification token email
  return { success: "User Created" };
};
