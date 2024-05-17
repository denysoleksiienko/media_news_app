import { useState } from 'react';

export const useLoading = (
  initialState = false
): { loading: boolean; startLoading: () => void; stopLoading: () => void } => {
  const [loading, setLoading] = useState(initialState);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return { loading, startLoading, stopLoading };
};
