"use server";
import * as z from "zod";

import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import { validateFieldsNatively } from "@hookform/resolvers";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Email!" };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not Found!" };
  }
  //Todo: Generate token and send email
  return { success: "Reset Email sent!" };
};
