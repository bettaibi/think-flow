"use server";
import { auth } from "@/lib/auth";

export async function signinWithSocial(provider: "github") {
  const response = await auth.api.signInSocial({
    body: { provider, callbackURL: "/projects" },
  });

  return response;
}
