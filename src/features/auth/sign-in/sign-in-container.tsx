"use client";

import Link from "next/link";
import { Button, Input, Label, Paper } from "@/components";
import { signinWithSocial } from "../actions/signin-with-social";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import { signIn } from "@/lib/auth-client";

const MagicLinkSignInSchema = z.object({
  email: z.email({ message: "Must be a valid email" }),
});

type FormData = z.infer<typeof MagicLinkSignInSchema>;

export function SignInContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<FormData>({
    resolver: zodResolver(MagicLinkSignInSchema),
  });

  const onSubmit = async ({ email }: FormData) => {
    try {
      const { data, error } = await signIn.magicLink({
        email,
        callbackURL: "/projects",
        newUserCallbackURL: "/projects",
        errorCallbackURL: "/error",
      });

      if (data?.status) {
        console.log("A magic link has been sent to your email.");
      }

      if (error?.message) {
        console.log(error.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      const { url } = await signinWithSocial(provider);
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error(`Failed to Sign in with ${provider}`, err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome to Think Flow
          </h1>
          <p className="text-muted-foreground">
            Join Think Flow and start organizing your ideas. Sign in with your
            GitHub account to get started
          </p>
        </div>

        {/* GitHub Sign In */}
        <Paper className="p-8">
          {/* Magic link */}
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Use magic link</Label>
              <Input type="email" id="email" {...register("email")} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <Button
              className="w-full h-12 text-base"
              variant="default"
              type="submit"
              disabled={isSubmitting || isLoading}
            >
              Send Magic Link
            </Button>
          </form>

          <div> OR </div>

          {/* Github Button*/}
          <Button
            onClick={() => handleSignIn("github")}
            className="w-full h-12 text-base"
            variant="default"
            type="button"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Continue with GitHub
          </Button>
        </Paper>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
