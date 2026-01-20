// Reusable API error handler with consistent error messages
export interface APIError {
  message: string;
  status?: number;
}

export const handleAPIError = (error: unknown): APIError => {
  if (error instanceof Error) {
    if ('response' in error) {
      const axiosError = error as any;
      return {
        message: axiosError.response?.data?.message || axiosError.message,
        status: axiosError.response?.status,
      };
    }
    return { message: error.message };
  }
  return { message: 'An unexpected error occurred' };
};
