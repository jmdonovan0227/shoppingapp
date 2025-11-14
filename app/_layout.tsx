import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient); // now we can debug our queries!

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Jake's Shopping App",
            headerShadowVisible: false,
            headerSearchBarOptions: {
              placeholder: "Search products...",
              hideWhenScrolling: false,
              hideNavigationBar: false,
            },
          }}
        />

        <Stack.Screen
          name="product/[id]"
          options={{
            title: "",
            headerBackTitle: "Products",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
