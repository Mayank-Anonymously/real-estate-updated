import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import PropertyListings from "../Listings/PropertyListings"; // Fixed typo

const ExploreScreen = () => {
  const region = {
    latitude: 40.0583, // Center latitude for New Jersey
    longitude: -74.4057, // Center longitude for New Jersey
    latitudeDelta: 0.5, // Adjust this value to control zoom level
    longitudeDelta: 0.5, // Adjust this value to control zoom level
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.section}>
          <MapView style={styles.map} initialRegion={region} />
        </View>

        <View
          style={{
            backgroundColor: "white",
            height: 900,
            position: "absolute",
            top: 100,
          }}
        >
          <PropertyListings />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: "#FF4C4C", // Red color for close button
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 10,
  },
  map: { width: "100%", height: 150, borderRadius: 8, marginVertical: 12 },

  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default ExploreScreen;
