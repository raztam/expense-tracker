import React from "react";
import { StyleSheet, View } from "react-native";
import LoginForm from "../components/UserVerification/LoginForm";
import { GlobalStyles } from "../constants/styles";

const Login = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
