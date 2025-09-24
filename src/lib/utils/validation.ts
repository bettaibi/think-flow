import { ZodSchema } from "zod";

/**
 * Utility function to handle Zod validation and return formatted errors
 */
export function validateForm<T>(
  schema: ZodSchema<T>,
  data: unknown
):
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const fieldErrors: Record<string, string> = {};
  result.error.issues.forEach((issue) => {
    if (issue.path[0]) {
      fieldErrors[issue.path[0] as string] = issue.message;
    }
  });

  return { success: false, errors: fieldErrors };
}

/**
 * Common password validation patterns
 */
export const passwordPatterns = {
  minLength: 8,
  requireUppercase: /[A-Z]/,
  requireLowercase: /[a-z]/,
  requireNumber: /\d/,
  requireSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
} as const;

/**
 * Email validation pattern (more permissive than Zod's default)
 */
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Name validation pattern (letters, spaces, hyphens, apostrophes)
 */
export const namePattern = /^[a-zA-Z\s'-]+$/;
