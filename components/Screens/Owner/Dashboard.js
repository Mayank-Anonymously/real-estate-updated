import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "react-native-vector-icons";
import ComplaintsTable from "../../ScreensComponents/OwnerSceens/ComplaintTable";

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Welcome! Bimal</Text>
        </View>

        {/* Property Cards */}
        <View style={styles.propertyRow}>
          <View style={[styles.propertyCard, styles.greenCard]}>
            <Text style={styles.cardTitle}>Total Property</Text>
            <View style={[styles.badge, styles.greenBadge]}>
              <Text style={styles.badgeTextGreen}>8</Text>
            </View>
          </View>

          <View style={[styles.propertyCard, styles.redCard]}>
            <Text style={styles.cardTitle}>Total tenant</Text>
            <View style={[styles.badge, styles.redBadge]}>
              <Text style={styles.badgeTextRed}>2</Text>
            </View>
          </View>
        </View>

        {/* Payment Card */}
        <View style={[styles.infoCard, styles.blueCard]}>
          <Entypo name="wallet" size={30} color="white" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Payment Received</Text>
            <Text style={styles.infoAmount}>$ 25,001</Text>
          </View>
        </View>

        {/* Views Card */}
        <View style={[styles.infoCard, styles.purpleCard]}>
          <Entypo name="eye" size={30} color="white" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Total Views</Text>
            <Text style={styles.infoAmount}>15,00,000</Text>
          </View>
        </View>

        <ComplaintsTable />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerSection: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  propertyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  propertyCard: {
    borderRadius: 10,
    width: 180,
    height: 100,
    padding: 20,
    justifyContent: "space-between",
  },
  greenCard: {
    backgroundColor: "#3dc8ac",
  },
  redCard: {
    backgroundColor: "#e65d4a",
  },
  cardTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
  badge: {
    borderRadius: 100,
    width: 30,
    height: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  greenBadge: {
    marginRight: 10,
  },
  redBadge: {
    marginRight: 10,
  },
  badgeTextGreen: {
    color: "#3dc8ac",
    fontWeight: "bold",
  },
  badgeTextRed: {
    color: "#e65d4a",
    fontWeight: "bold",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  infoContent: {
    marginLeft: 15,
  },
  infoLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  infoAmount: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },
  blueCard: {
    backgroundColor: "#4a90e2",
  },
  purpleCard: {
    backgroundColor: "#8e44ad",
  },
});
