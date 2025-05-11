import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import {
  fetchFilters,
  fetchPropertyTypes,
} from "../../utils/apicalls/FetchallFilters";
import CustomText from "../common/Text";

const FilterScreen = ({ onApplyFilters }) => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [bedrooms, setBedrooms] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [filters, setFilters] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [bedroomOptions, setBedroomOptions] = useState([]);
  const [bathroomOptions, setBathroomOptions] = useState([]);

  const handleApplyFilters = () => {
    onApplyFilters({
      location,
      minPrice,
      maxPrice,
      bedrooms,
      propertyType,
    });
  };

  const handleResetFilters = () => {
    // Reset to default values
    setLocation("");
    setMinPrice(0);
    setMaxPrice(10000);
    setBedrooms([]);
    setPropertyType([]);
  };

  useEffect(() => {
    fetchFilters(
      setPropertyTypes,
      setBedroomOptions,
      setBathroomOptions,
      setFilters
    );
  }, []);

  const toggleSelection = (value, selectedArray, setSelectedArray) => {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter((item) => item !== value));
    } else {
      setSelectedArray([...selectedArray, value]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <CustomText style={styles.label}>Location</CustomText>
        <TextInput
          style={styles.input}
          placeholder="Enter Location"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <View style={styles.inputContainer}>
        <CustomText style={styles.label}>Min Price: ${minPrice}</CustomText>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10000}
          step={500}
          value={minPrice}
          onValueChange={setMinPrice}
          minimumTrackTintColor="#5A67D8"
          maximumTrackTintColor="#ccc"
        />
        <CustomText style={styles.label}>Max Price: ${maxPrice}</CustomText>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10000}
          step={500}
          value={maxPrice}
          onValueChange={setMaxPrice}
          minimumTrackTintColor="#5A67D8"
          maximumTrackTintColor="#ccc"
        />
      </View>

      <View style={styles.inputContainer}>
        <CustomText style={styles.label}>Property Types</CustomText>
        <View style={styles.tabContainer}>
          {propertyTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                propertyType.includes(type) && styles.selectedTab,
              ]}
              onPress={() =>
                toggleSelection(type, propertyType, setPropertyType)
              }
            >
              <Text
                style={[
                  styles.tabText,
                  propertyType.includes(type) && styles.selectedTabText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <CustomText style={styles.label}>Bedrooms</CustomText>
        <View style={styles.tabContainer}>
          {filters.map((num) => (
            <TouchableOpacity
              key={num}
              style={[styles.tab, bedrooms.includes(num) && styles.selectedTab]}
              onPress={() => toggleSelection(num, bedrooms, setBedrooms)}
            >
              <Text
                style={[
                  styles.tabText,
                  bedrooms.includes(num) && styles.selectedTabText,
                ]}
              >
                {num}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={handleApplyFilters}
          style={[styles.applyButton]}
        >
          <CustomText style={styles.applyButtonText}>Apply Filters</CustomText>
        </TouchableOpacity>

        {/* Reset Filters Button */}
        <TouchableOpacity
          onPress={handleResetFilters}
          style={styles.resetButton}
        >
          <CustomText style={styles.resetButtonText}>Reset Filters</CustomText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  inputContainer: {
    marginBottom: 20,
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
    margin: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  tabContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tab: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5,
  },
  selectedTab: {
    backgroundColor: "#5A67D8",
  },
  tabText: {
    color: "#333",
    fontSize: 14,
  },
  selectedTabText: {
    color: "#fff",
  },
  applyButton: {
    borderColor: "#5A67D8",
    padding: 15,
    borderRadius: 10,
    marginBottom: "70%",

    alignItems: "center",
    borderWidth: 1,
  },
  applyButtonText: {
    color: "#5A67D8",
    fontSize: 16,
  },
  resetButton: {
    borderColor: "#E53E3E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: "70%",
    borderWidth: 1,
  },
  resetButtonText: {
    color: "#E53E3E",
    fontSize: 16,
  },
});

export default FilterScreen;
