"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Paper } from "@/components";
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";

export function SignUpForm() {
  const [generalError, setGeneralError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data: SignUpFormData) => {
    setGeneralError("");

    try {
      // TODO: Add registration logic
      console.log("Sign up:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Handle successful sign up here
    } catch (error) {
      console.error("Sign up error:", error);
      setGeneralError("Sign up failed. Please try again.");
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
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First name"
            placeholder="John"
            error={errors.firstName?.message}
            {...register("firstName", {
              onChange: () => {
                if (generalError) setGeneralError("");
                if (errors.firstName) clearErrors("firstName");
              },
            })}
            required
          />
          <Input
            label="Last name"
            placeholder="Doe"
            error={errors.lastName?.message}
            {...register("lastName", {
              onChange: () => {
                if (generalError) setGeneralError("");
                if (errors.lastName) clearErrors("lastName");
              },
            })}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
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
          placeholder="Create a password"
          error={errors.password?.message}
          {...register("password", {
            onChange: () => {
              if (generalError) setGeneralError("");
              if (errors.password) clearErrors("password");
            },
          })}
          required
        />

        <Input
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            onChange: () => {
              if (generalError) setGeneralError("");
              if (errors.confirmPassword) clearErrors("confirmPassword");
            },
          })}
          required
        />

        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="agree-terms"
              {...register("agreeToTerms", {
                onChange: () => {
                  if (generalError) setGeneralError("");
                  if (errors.agreeToTerms) clearErrors("agreeToTerms");
                },
              })}
              className={`h-4 w-4 shrink-0 rounded-sm border ring-offset-background 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground
                ${
                  errors.agreeToTerms ? "border-destructive" : "border-primary"
                }`}
            />
            <label htmlFor="agree-terms" className="text-sm">
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-destructive">
              {errors.agreeToTerms.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </Paper>
  );
}
