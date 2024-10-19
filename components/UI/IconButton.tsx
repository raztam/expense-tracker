import { View, Pressable, StyleSheet } from "react-native";
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps {
  name: React.ComponentProps<typeof Ionicons>["name"];
  size: number;
  color: string | undefined;
  onPress: () => void;
}

const IconButton: FC<IconButtonProps> = (props) => {
  const { name, size, color, onPress } = props;

  return (
    <Pressable
      style={({ pressed }) => (pressed ? styles.pressed : null)}
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={name} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
  },
  pressed: {
    opacity: 0.75,
  },
});
