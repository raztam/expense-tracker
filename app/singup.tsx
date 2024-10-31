import React from "react";
import { StyleSheet, View } from "react-native";
import SignUpForm from "../components/UserVerification/SingUpForm";
import { GlobalStyles } from "../constants/styles";

const SingUp = () => {
  return (
    <View style={styles.container}>
      <SignUpForm />
    </View>
  );
};

export default SingUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
