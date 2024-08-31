'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useState } from 'react';

type TanstackQueryProviderProps = PropsWithChildren<{}>;

export function TanstackQueryProvider({ children }: TanstackQueryProviderProps) {
  // Create a client, but inside the provider to avoid hydration errors on page refresh
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
