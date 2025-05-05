import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import RNPickerSelect from "react-native-picker-select";


const propertyTypes = [
  { id: 'Apartment', name: 'Apartment' },
  { id: 'House', name: 'House' },
  { id: 'Villa', name: 'Villa' },
  { id: 'Land', name: 'Land' },
];

const FilterScreen = ({ onApplyFilters }) => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [bedrooms, setBedrooms] = useState(1);
  const [propertyType, setPropertyType] = useState("Apartment");
  const [selectedTypes, setSelectedTypes] = useState([]);
  
  const handleApplyFilters = () => {
    onApplyFilters({ location, minPrice, maxPrice, bedrooms, propertyType });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
  
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Location"
          value={location}
          onChangeText={setLocation}
        />
      </View>


      <View style={[styles.inputContainer, {
        flexDirection: "row",
        justifyContent: "space-between"
      }]}>
        <View>

          <Text style={styles.label}>Min Price: ${minPrice}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10000}
            step={5000}
            value={minPrice}
            onValueChange={setMinPrice}
            minimumTrackTintColor="#5A67D8"
            maximumTrackTintColor="#ccc"
          />
        </View>
        <View>


          <Text style={styles.label}>Max Price: ${maxPrice}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10000}
            step={5000}
            value={maxPrice}
            onValueChange={setMaxPrice}
            minimumTrackTintColor="#5A67D8"
            maximumTrackTintColor="#ccc"
          />
        </View>
      </View>

      {/* Bedrooms Picker */}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bedrooms</Text>
        <RNPickerSelect
          onValueChange={(value) => setBedrooms(value)}
          value={bedrooms}
          style={pickerSelectStyles}
          items={[1, 2, 3, 4, 5].map((num) => ({
            label: `${num} Bedroom${num > 1 ? "s" : ""}`,
            value: num,
          }))}
        />
      </View>

      {/* Property Type Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Property Type</Text>
        <RNPickerSelect
          onValueChange={(value) => setPropertyType(value)}
          value={propertyType}
          style={pickerSelectStyles}
          items={[
            { label: "Apartment", value: "Apartment" },
            { label: "House", value: "House" },
            { label: "Villa", value: "Villa" },
            { label: "Land", value: "Land" },
          ]}
        />
      </View>

      {/* <Button title="Apply Filters" onPress={handleApplyFilters} /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal : 10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
};

export default FilterScreen;
