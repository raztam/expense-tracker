import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from "react-native";
import React, { FC } from "react";
import { GlobalStyles } from "../../constants/styles";

export interface InputProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  textInputConfig: {
    keyboardType?: KeyboardTypeOptions;
    onChangeText: (text: string) => void;
    value: string;
    placeholder?: string;
    maxLength?: number;
    multiline?: boolean;
    autoFocus?: boolean;
    editable?: boolean;
    secureTextEntry?: boolean;
  };
  errors?: string[];
  onPress?: () => void;
}

const Input: FC<InputProps> = (props) => {
  const { label, style, textInputConfig, errors, onPress } = props;
  const inputStyles: StyleProp<TextStyle>[] = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  const content = <TextInput style={inputStyles} {...textInputConfig} />;

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      {onPress ? (
        <Pressable onPress={onPress}>{content}</Pressable>
      ) : (
        content
      )}
      {errors &&
        errors.map((error) => (
          <Text key={error} style={{ color: "red" }}>
            {error}
          </Text>
        ))}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
