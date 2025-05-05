import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import CustomText from "../common/Text";
import CustomTextBold from "../common/BoldCustomtext";

const InternationalMigrations = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>International Migrations</CustomText>
      <View style={styles.cardContainer}>
        <Card
          imageSource={{
            uri: "https://images.unsplash.com/photo-1557335200-a65f7f032602?q=80&w=3558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          title="Texas"
          subtitle="345 rented props"
        />
        <Card
          imageSource={{
            uri: "https://images.unsplash.com/photo-1619083382085-9452906b7157?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhbGlmb3JuaWF8ZW58MHx8MHx8fDA%3D",
          }}
          title="California"
          subtitle="290 rented props"
        />
      </View>
      <View style={styles.hostSection}>
        <View>
          <Image
            style={{
              width: 100,
              height: 150,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            source={require("../../assets/images/active_landlord.png")}
          />
        </View>
        <View>
          <CustomTextBold style={styles.hostTitle}>
            Want to host your {"\n"} own place?
          </CustomTextBold>
          <Text></Text>
          <CustomText style={styles.hostSubtitle}>
            Earn passive income by
            {"\n"}renting or selling your
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const Card = ({ imageSource, title, subtitle }) => (
  <View style={styles.card}>
    <Image source={imageSource} style={styles.cardImage} />
    <CustomText style={styles.cardTitle}>{title}</CustomText>
    <CustomText style={styles.cardSubtitle}>{subtitle}</CustomText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#888",
  },
  hostSection: {
    backgroundColor: "#6246EA",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  hostTitle: {
    fontSize: 18,
    color: "white",
    marginLeft: 40,
  },
  hostSubtitle: {
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 40,
    color: "white",
  },

  button: {
    padding: 10,
    backgroundColor: "#7e57c2",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default InternationalMigrations;
