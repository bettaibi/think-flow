/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";

interface UseActionOptions<TInput, TResult> {
  onSuccess?: (result: TResult) => void;
  onError?: (error: unknown) => void;
}

interface UseActionState<TResult> {
  loading: boolean;
  data?: TResult;
  error?: string;
}

/**
 * A reusable hook to handle Next.js Server Actions with loading/error states.
 */
export function useAction<TInput, TResult>(
  action: (input: TInput) => Promise<TResult>,
  options?: UseActionOptions<TInput, TResult>
) {
  const [state, setState] = useState<UseActionState<TResult>>({
    loading: false,
  });

  const execute = useCallback(
    async (input: TInput) => {
      setState({ loading: true });
      try {
        const result = await action(input);
        setState({ loading: false, data: result });
        options?.onSuccess?.(result);
        return result;
      } catch (error: any) {
        console.error("useAction error:", error);
        const message = error?.message || "Something went wrong";
        setState({ loading: false, error: message });
        options?.onError?.(error);
        throw error;
      }
    },
    [action, options]
  );

  return {
    ...state,
    execute,
  };
}
