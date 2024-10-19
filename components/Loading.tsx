import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Loading = () => {
  return <Text style={styles.loadingText}>Loading...</Text>;
};

export default Loading;

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
