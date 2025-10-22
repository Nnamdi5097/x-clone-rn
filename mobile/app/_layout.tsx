import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from 'expo-router';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { StatusBar } from "react-native";




export default function RootLayout() {
 
  return  (  
        
      <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={QueryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar />
      </QueryClientProvider>
    </ClerkProvider>

  );      
}
 