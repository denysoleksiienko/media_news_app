import { useState } from 'react';

export const useTextError = (
  initialError = ''
): {
  error: string;
  setError: (err: string) => void;
  resetError: () => void;
} => {
  const [textError, setTextError] = useState(initialError);

  const setError = (err: string) => setTextError(err);
  const resetError = () => setTextError('');

  return { error: textError, setError, resetError };
};
