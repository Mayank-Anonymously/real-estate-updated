// components/RealEstateMap.js

import React, { useRef, useMemo, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';

const properties = [
  {
    id: '1',
    title: '2 Bed Apartment',
    description: '$350,000 - New York',
    latitude: 40.73061,
    longitude: -73.935242,
  },
  {
    id: '2',
    title: '4 Bed House',
    description: '$750,000 - Los Angeles',
    latitude: 34.052235,
    longitude: -118.243683,
  },
];

const RealEstateMap = () => {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleMarkerPress = useCallback((property) => {
    setSelectedProperty(property);
    sheetRef.current?.snapToIndex(0); // Open bottom sheet
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 39.8283,
          longitude: -98.5795,
          latitudeDelta: 40,
          longitudeDelta: 40,
        }}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            coordinate={{
              latitude: property.latitude,
              longitude: property.longitude,
            }}
            onPress={() => handleMarkerPress(property)}
          />
        ))}
      </MapView>

      <BottomSheet
        ref={sheetRef}
        index={-1} // Hidden by default
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <View style={styles.sheetContent}>
          {selectedProperty ? (
            <>
              <Text style={styles.title}>{selectedProperty.title}</Text>
              <Text>{selectedProperty.description}</Text>
              {/* Add more info or buttons here */}
            </>
          ) : (
            <Text>Select a property</Text>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export default RealEstateMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  sheetContent: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});
    