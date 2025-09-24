"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input, Button, Checkbox, Paper } from "@/components";
import { signInSchema, type SignInFormData } from "@/lib/validations/auth";

export function SignInForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const [generalError, setGeneralError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setGeneralError("");

    try {
      // TODO: Add authentication logic
      console.log("Sign in:", { ...data, rememberMe });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle successful sign in here
      toast.success("Welcome back! You've been signed in successfully.");
    } catch (error) {
      console.error("Sign in error:", error);
      setGeneralError("Sign in failed. Please try again.");
      toast.error(
        "Sign in failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <Paper className="p-8">
      {generalError && (
        <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive text-destructive text-sm">
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
              onChange: () => {
                if (generalError) setGeneralError("");
                if (errors.email) clearErrors("email");
              },
            })}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password", {
              onChange: () => {
                if (generalError) setGeneralError("");
                if (errors.password) clearErrors("password");
              },
            })}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            label="Remember me"
          />
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </Paper>
  );
}
