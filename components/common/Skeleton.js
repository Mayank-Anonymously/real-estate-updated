import React from "react";
import { Text, StyleSheet } from "react-native";
import SkeletonContent from "react-native-skeleton-content";

export default function Placeholder({ loading }) {
  return (
    <SkeletonContent
      containerStyle={{ flex: 1, width: 300, marginVertical: 10 }}
      isLoading={loading}
      layout={[
        { key: "image", width: 300, height: 140, marginBottom: 10 },
        { key: "title", width: 220, height: 20, marginBottom: 6 },
        { key: "location", width: 180, height: 16, marginBottom: 6 },
        { key: "price", width: 100, height: 18, marginBottom: 10 },
        { key: "specs", width: 280, height: 20 },
      ]}
    >
      <Text style={styles.normalText}>Your content</Text>
      <Text style={styles.bigText}>Other content</Text>
    </SkeletonContent>
  );
}

const styles = StyleSheet.create({
  normalText: {
    fontSize: 14,
    color: "#333",
  },
  bigText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },
});
