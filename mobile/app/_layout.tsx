import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import * as Font from "expo-font";
if (__DEV__) {
  require("../devtools/reactotron");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

export default function RootLayout() {
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          CircularStd: require("../assets/fonts/CircularStd.ttf"),
          "CircularStd-Book": require("../assets/fonts/CircularStd-Book.ttf"),
          "SF-Pro-Semibold": require("../assets/fonts/SF-Pro-Semibold.otf"),
        });
        console.log("Successfully loaded fonts");
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };

    loadFonts();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="owners/[id]" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
