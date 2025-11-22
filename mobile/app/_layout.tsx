import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFavorites } from "../store/favorites";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

export default function RootLayout() {
  const hydrateFavorites = useFavorites((s) => s.hydrate);
  useEffect(() => {
    hydrateFavorites();
  }, [hydrateFavorites]);
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="owners/[id]" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
