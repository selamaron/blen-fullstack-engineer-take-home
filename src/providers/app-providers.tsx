import { PropsWithChildren } from 'react';
import { TanstackQueryProvider } from './tanstack-query-provider';
import { TaskProvider } from './task-provider';
import { TaskProviderSSRWrapper } from './task-provider-ssr-wrapper';
import { ThemeProvider } from './theme-provider';

type AppProvidersProps = PropsWithChildren;

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TanstackQueryProvider>
        <TaskProviderSSRWrapper>
          <TaskProvider>{children}</TaskProvider>
        </TaskProviderSSRWrapper>
      </TanstackQueryProvider>
    </ThemeProvider>
  );
}
