import { View, Text, Pressable } from "react-native";
import { Tabs } from "expo-router";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { GlobalStyles } from "../../constants/styles";
import IconButton from "../../components/UI/IconButton";
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTitleAlign: "center",
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            name="add"
            size={24}
            color={tintColor}
            onPress={() => {
              router.push("/manageExpenses");
            }}
          />
        ),
        headerLeft: ({ tintColor }) => (
          <Pressable onPress={logout}>
            <Text style={{ color: "red", fontWeight: "bold", marginLeft: 10 }}>
              logout
            </Text>
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="recentExpenses"
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="allExpenses"
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
