import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
};

export const queryContexts = (children) => {
  const testClient = createTestQueryClient();
  return (
    <MemoryRouter>
      <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
};
