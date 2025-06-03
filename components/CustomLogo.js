import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomTextBold from "./common/BoldCustomtext";
import CustomText from "./common/Text";

const CustomLogo = ({ image }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <CustomTextBold style={{ fontSize: 27, color: "#051138" }}>
          AFFORDABLE{" "}
        </CustomTextBold>
        <CustomTextBold style={{ fontSize: 26, color: "#051138" }}>
          NJ <CustomText>HOUSING</CustomText>{" "}
        </CustomTextBold>
      </View>
      <Image
        source={image}
        style={{ width: 70, height: 70, resizeMode: "contain" }}
      />
    </View>
  );
};

export default CustomLogo;

const styles = StyleSheet.create({});
