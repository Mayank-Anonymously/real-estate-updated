import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
      <Text style={styles.stepText}>
        Step {currentStep} of {totalSteps}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    width: "0%", // Default width
  },
  stepText: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default ProgressBar;
