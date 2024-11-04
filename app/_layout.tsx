import { Stack } from "expo-router";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "../context/authContext";
import { GlobalStyles } from "../constants/styles";
import { StatusBar } from "react-native";

const Layout = () => {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={new QueryClient()}>
        <StatusBar barStyle="dark-content" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTitleAlign: "center",
            headerTintColor: "black",
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />

          <Stack.Screen name="singup" options={{ headerShown: false }} />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen
            name="manageExpenses"
            options={{ presentation: "modal" }}
          />
        </Stack>
      </QueryClientProvider>
    </AuthContextProvider>
  );
};

export default Layout;
