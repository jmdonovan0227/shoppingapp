import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import CartButton from "@/components/CartButton";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { storage } from "@/store/mmkv";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Sentry from "@sentry/react-native";
import { useEffect } from "react";
import { useNavigationContainerRef } from "@react-navigation/native";

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

Sentry.init({
  dsn: "https://a6970567974af0e8412b9d4a3abf649e@o4509427149045760.ingest.us.sentry.io/4510371012804608",
  attachScreenshot: true,
  debug: false,
  tracesSampleRate: 1.0, // affects performance 1.0 = 100% of traces are sent

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration({
      maskAllText: true,
      maskAllImages: true,
      maskAllVectors: true,
    }),
    Sentry.spotlightIntegration(),
    navigationIntegration,
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
  _experiments: {
    profilesSampleRate: 1.0, // change to lower value in production
    replaysSessionSampleRate: 1.0, // change to lower value in production
    replaysOnErrorSampleRate: 1.0,
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

export default Sentry.wrap(function RootLayout() {
  useReactQueryDevTools(queryClient); // now we can debug our queries!
  useMMKVDevTools({ storage }); // now we can debug our mmkv store!

  const router = useRouter();

  const ref = useNavigationContainerRef();

  useEffect(() => {
    navigationIntegration.registerNavigationContainer(ref);
  }, [ref]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
              headerRight: () => <CartButton />,
            }}
          />

          <Stack.Screen
            name="product/[id]"
            options={{
              title: "",
              headerBackTitle: "Products",
            }}
          />

          <Stack.Screen
            name="cart"
            options={{
              title: "Cart",
              presentation: "modal", // this will make the cart screen a modal, meaning it will be displayed on top of the current screen.
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.dismiss()}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
});
