import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StyleProp, ViewStyle } from "react-native";
import Input, { InputProps } from "./Input"; // Adjust the import path as necessary

interface PasswordInputProps extends InputProps {}

const withPasswordToggle = (WrappedComponent: FC<InputProps>) => {
  const PasswordInput: FC<PasswordInputProps> = (props) => {
    const { label, style, textInputConfig, errors } = props;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <View style={[styles.inputContainer, style]}>
        <WrappedComponent
          label={label}
          style={styles.input}
          textInputConfig={{
            ...textInputConfig,
            secureTextEntry: !isPasswordVisible,
          }}
          errors={errors}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>
            {isPasswordVisible ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return PasswordInput;
};

const PasswordInput = withPasswordToggle(Input);

export default PasswordInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    position: "relative",
  },
  input: {
    flex: 1,
  },
  toggleButton: {
    position: "absolute",
    right: 10,
    top: 35,
  },
  toggleText: {
    color: "blue",
  },
});
