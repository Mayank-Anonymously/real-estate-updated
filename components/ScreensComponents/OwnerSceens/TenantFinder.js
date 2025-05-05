import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button, Paragraph } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const TenantFinder = () => {
  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.profileSection}>
            <Image
              source={require("../../../assets/icon.png")}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}> Nia Bahadur</Text>
          </View>
          <Text style={styles.timeText}>14 min</Text>
        </View>

        <View style={styles.cardBody}>
          <View>
            <Text style={styles.subtitle}>Looking for Apartment</Text>
            <Text style={styles.location}>in Balwatar</Text>
          </View>
          <Button
            mode="contained"
            onPress={() => {}}
            style={{
              backgroundColor: "#315ee7",
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            View
          </Button>
        </View>
      </View>
    </>
  );
};

export default TenantFinder;

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
  },
  card: {
    backgroundColor: "#E4F7FF",
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
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
