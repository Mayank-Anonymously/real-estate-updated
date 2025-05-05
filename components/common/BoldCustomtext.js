// components/CustomText.js
import { Text, StyleSheet } from "react-native";
import React from "react";

const CustomTextBold = ({ style, children, ...props }) => (
  <Text style={[styles.text, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Bold",
  },
});

export default CustomTextBold;
