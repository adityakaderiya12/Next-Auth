import { auth } from "@/auth";
import React from "react";
const Settings = async () => {
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
};

export default Settings;
