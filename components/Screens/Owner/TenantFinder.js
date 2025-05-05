import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button, Paragraph } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import TenantFinder from "../../ScreensComponents/OwnerSceens/TenantFinder";
import { ScrollView } from "react-native";

const TenantFinderScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Tenant Finder</Text>
          <Paragraph>Find perfect tenant for your property</Paragraph>
        </View>
        <TenantFinder />
        <TenantFinder />
        <TenantFinder />
        <TenantFinder />
        <TenantFinder />
        <TenantFinder />
        <TenantFinder />
        <TenantFinder />
        <TenantFinder />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TenantFinderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerSection: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#E4F7FF",
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 100,
  },
  profileName: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 14,
    color: "#B4BBC6",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    alignItems: "center",
    marginVertical: 20,
  },
  subtitle: {
    color: "#1a2b49",
  },
  location: {
    fontSize: 23,
    color: "#1a2b49",
  },
});
