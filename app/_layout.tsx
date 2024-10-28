import { Stack } from "expo-router";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalStyles } from "../constants/styles";
import { StatusBar } from "react-native";

const Layout = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <StatusBar barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary100 },
          headerTitleAlign: "center",
          headerTintColor: "black",
        }}
      >
        <Stack.Screen name="Login" options={{ headerShown: false }} />

        <Stack.Screen name="SingUp" options={{ headerShown: false }} />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="manageExpenses"
          options={{ presentation: "modal" }}
        />
      </Stack>
    </QueryClientProvider>
  );
};

export default Layout;
