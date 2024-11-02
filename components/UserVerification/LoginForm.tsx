import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { GlobalStyles } from "../../constants/styles";
import { AuthContext } from "../../context/authContext";
import loginSchema from "./loginSchema";
import Button from "../UI/Button";
import Input from "../UI/Input";
import PasswordInput from "../UI/PasswordInput";
import Title from "../UI/Title";
import React from "react";
import useLoginUser from "../../api/userAuthenticationApi/useLoginUser";
import useForm from "../../hooks/useFrom";
import { useRouter } from "expo-router";

const LoginForm = () => {
  const router = useRouter();

  type FormInputType = {
    email: string;
    password: string;
  };

  const inputFields: FormInputType = {
    email: "",
    password: "",
  };

  const { inputValues, inputChangeHandler, errors, validateForm } = useForm(
    inputFields,
    loginSchema
  );
  const { authenticate } = useContext(AuthContext);
  const loginHandler = async () => {
    // validate form
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    // login user
    const authToken = await useLoginUser(
      inputValues.email,
      inputValues.password
    );
    // if user is not authenticated return
    if (!authToken) {
      return;
    }
    // if user is authenticated set auth token and redirect to recentExpenses
    authenticate(authToken);
    router.replace({
      pathname: "recentExpenses",
    });
  };

  const signUpHandler = () => {
    router.push({
      pathname: "singup",
    });
  };

  return (
    <View style={styles.formContainer}>
      <View>
        <Title>Login</Title>
        <Input
          label="email"
          style={{}}
          textInputConfig={{
            value: inputValues.email,
            onChangeText: (text) => inputChangeHandler("email", text),
          }}
          errors={errors.email}
        />
        <Input
          label="password"
          style={{}}
          textInputConfig={{
            value: inputValues.password,
            onChangeText: (text) => inputChangeHandler("password", text),
          }}
          errors={errors.password}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={loginHandler}>
          Login
        </Button>
        <Button mode="flat" style={styles.button} onPress={signUpHandler}>
          Sign Up
        </Button>
      </View>
    </View>
  );
};

export default LoginForm;

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
  },
});
