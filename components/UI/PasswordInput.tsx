import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Input, { InputProps } from "./Input";
import { Ionicons } from "@expo/vector-icons";

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
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="#666"
          />
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
    minHeight: 80,
  },
  input: {
    flex: 1,
    height: 50,
  },
  toggleButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -5 }], // Changed from -12 to -8 to better center the icon
    zIndex: 1,
  },
  toggleText: {
    color: "blue",
  },
});
