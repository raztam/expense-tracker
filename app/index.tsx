import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "../components/UI/Button";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();

  const loginHandler = () => {
    router.push({
      pathname: "(tabs)",
    });
  };

  const signUpHandler = () => {
    router.push({
      pathname: "/SignUp",
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Expense Tracker App!</Text>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={loginHandler}>
          Login
        </Button>
        {
          <Button mode="flat" style={styles.button} onPress={signUpHandler}>
            SignUp
          </Button>
        }
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
  },
});
