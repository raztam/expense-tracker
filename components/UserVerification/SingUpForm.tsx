import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Input from "../UI/Input";
import PasswordInput from "../UI/PasswordInput";
import Button from "../UI/Button";
import Title from "../UI/Title";
import { GlobalStyles } from "../../constants/styles";
import signupSchema from "./singupShcema";
import useCreateUser from "../../api/userAuthenticationApi/useCreateUser";
import useForm from "../../hooks/useFrom";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const SignUpForm = () => {
  type formInput = {
    email: string;
    password: string;
    confirmPassword: string;
  };

  const inputFields: formInput = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    inputValues,
    inputChangeHandler,
    errors,
    setAuthError,
    validateForm,
  } = useForm(inputFields, signupSchema);

  const { authenticate } = useContext(AuthContext);

  const router = useRouter();

  const signUpHandler = async () => {
    // validate form
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    // create user
    const result = await useCreateUser(inputValues.email, inputValues.password);
    // If result is a string them its an error, set error and return
    if (!result || typeof result === "string") {
      setAuthError(result as string);
      return;
    }
    // if user is created set auth token and redirect to recentExpenses
    authenticate(result);
    router.replace({
      pathname: "recentExpenses",
    });
  };

  return (
    <View style={styles.formContainer}>
      <Title>Sing Up</Title>
      <Input
        label="Email"
        textInputConfig={{
          value: inputValues.email,
          onChangeText: (text) => inputChangeHandler("email", text),
        }}
        errors={errors.email}
      />
      <PasswordInput
        label="Password"
        textInputConfig={{
          value: inputValues.password,
          onChangeText: (text) => inputChangeHandler("password", text),
        }}
        errors={errors.password}
      />
      <PasswordInput
        label="Confirm Password"
        textInputConfig={{
          value: inputValues.confirmPassword,
          onChangeText: (text) => inputChangeHandler("confirmPassword", text),
        }}
        errors={errors.confirmPassword}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={signUpHandler}>
          Sign Up
        </Button>
        <Button mode="flat" style={styles.button} onPress={() => router.back()}>
          Go Back
        </Button>
      </View>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  formContainer: {
    backgroundColor: GlobalStyles.colors.primary700,
    width: "80%",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
  },
});
