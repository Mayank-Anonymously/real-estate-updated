import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import PropertyListings from "../Listings/PropertyListings"; // Fixed typo
import { useFocusEffect } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import CustomText from "../common/Text";

const ExploreScreen = () => {
  // Create a reference for the bottom sheet
  const bottomSheetRef = useRef();

  // Open state, you can control whether the bottom sheet is open or closed
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Use useFocusEffect to open the bottom sheet when ExploreScreen is focused
  useFocusEffect(
    React.useCallback(() => {
      // When the screen comes into focus, open the bottom sheet
      bottomSheetRef.current.open();
      setIsSheetOpen(true);

      // Return a cleanup function to close the bottom sheet when leaving the screen
      return () => {
        bottomSheetRef.current.close();
        setIsSheetOpen(false);
      };
    }, [])
  );

  const closeBottomSheet = () => {
    bottomSheetRef.current.close(); // Close it programmatically
    setIsSheetOpen(false);
  };

  const region = {
    latitude: 40.0583, // Center latitude for New Jersey
    longitude: -74.4057, // Center longitude for New Jersey
    latitudeDelta: 0.5, // Adjust this value to control zoom level
    longitudeDelta: 0.5, // Adjust this value to control zoom level
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <MapView style={styles.map} initialRegion={region} />
      </View>
      <RBSheet
        ref={bottomSheetRef}
        height={700}
        closeOnDragDown={true} // Allows closing by dragging down
        closeOnPressMask={false} // Allows closing by tapping outside
        customStyles={{
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            borderTopLeftRadius: 30, // Rounded top-left corner
            borderTopRightRadius: 30, // Rounded top-right corner
          },
        }}
      >
        {/* Property Listings inside the Bottom Sheet */}
        <View style={styles.bottomSheetContent}>
          <PropertyListings />
        </View>
      </RBSheet>
    </View>
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
