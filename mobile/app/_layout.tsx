import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";

// 1. Grab the key (Check both Expo and Next prefixes just in case)
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

export default function RootLayout() {
  // 2. Safety check: If the key is missing, show a helpful message instead of a white screen
  if (!publishableKey) {
    console.error("Clerk Publishable Key is missing! Check your Vercel Environment Variables.");
    return null; // Or a simple <Text> loading screen
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="dark" />
      </QueryClientProvider>
    </ClerkProvider>
  );
}













// import { ClerkProvider } from "@clerk/clerk-expo";
//import { tokenCache } from "@clerk/clerk-expo/token-cache";
//import { Stack } from "expo-router";
//import "../global.css";
//import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { StatusBar } from "expo-status-bar";

//const queryClient = new QueryClient();

//export default function RootLayout() {
 // return (
    //<ClerkProvider tokenCache={tokenCache}>
      //<QueryClientProvider client={queryClient}>
     //   <Stack screenOptions={{ headerShown: false }}>
     //     <Stack.Screen name="(auth)" />
     //     <Stack.Screen name="(tabs)" />
    //    </Stack>
    //    <StatusBar style="dark" />
    //  </QueryClientProvider>
   // </ClerkProvider>
  //);
//}
