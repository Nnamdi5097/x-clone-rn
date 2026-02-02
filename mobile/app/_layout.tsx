import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import "../global.css";
import { cssInterop } from "nativewind";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";

// 1. Grab the key from your .env file
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const queryClient = new QueryClient();

export default function RootLayout() {
  // 2. Add a safety check to make sure the key is actually loading
  if (!publishableKey) {
    console.error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env file!");
  }

  return (
    // 3. PASS THE KEY HERE (This is the missing piece!)
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
