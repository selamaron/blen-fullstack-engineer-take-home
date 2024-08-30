import { PropsWithChildren } from 'react';
import { TanstackQueryProvider } from './tanstack-query-provider';
import { TaskProvider } from './task-provider';
import { ThemeProvider } from './theme-provider';

type AppProvidersProps = PropsWithChildren;

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <TaskProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </ThemeProvider>
    </TaskProvider>
  );
}
