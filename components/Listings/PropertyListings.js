import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import PropertyCard from "../cards/ProppertCard";
import { Ionicons } from "react-native-vector-icons";
import FilterScreen from "../Screens/FilterScreen";
import { fetchallcity } from "../../utils/apicalls/fetchall";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const RenderList = ({ item, navigation }) => (
  <View style={{ justifyContent: "center", alignItems: "center" }}>
    <PropertyCard
      onPress={() =>
        navigation.navigate("PropertyDetail", {
          id: item._id,
        })
      }
      title={item.title}
      location={item.address}
      price={item.price}
      description={item.description}
      image={item.image}
    />
  </View>
);

const Propertlistings = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [bedrooms, setBedrooms] = useState([]);

  const [filters, setFilters] = useState({
    location: "",
    minPrice: 0,
    maxPrice: 1000000,
    bedrooms: [],
    bathrooms: [],
    propertyType: [],
  });

  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    fetchallcity((res) => {
      setData(res);
      setFilteredData(res);
    });
  }, []);

  const openFilter = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeFilter = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  // Extracts structured info from the description string
  const extractDescriptionInfo = (description) => {
    const desc = description
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const cleanedStrig = desc.split("•").map((part) => part.trim());

    const bedrooms = parseInt(cleanedStrig[0].split(" ")[0]);
    const bathrooms = parseInt(cleanedStrig[1].split(" ")[0]);
    const propertyType = cleanedStrig[2];

    return { bedrooms, bathrooms, propertyType };
  };
  

  var bed  = ""
  const applyFilters = ({ newFilters}) => {
    const { bedrooms } = newFilters;
    // const {  minPrice, maxPrice, bedrooms, bathrooms, propertyType } = newFilters;

    const filtered = data.filter((item) => {

      
      // // Extract structured info from description
      const desc = item.description
        .replace(/\u00A0/g, " ")
        
        .replace(/\s+/g, " ")
        .trim();
      const cleanedStrig = desc.split("•").map((part) => part.trim());

      const itemBedrooms = parseInt(cleanedStrig[0].split(" ")[0]);
      const itemBathrooms = parseInt(cleanedStrig[1].split(" ")[0]);
      const itemPropertyType = cleanedStrig[2];
      

      console.log("checkforbed:" , itemBedrooms)
      // console.log("checkforbed:" , bedrooms)
      // Apply individual filters
      // const matchesLocation =
      //   location === "" ||
      //   item.address?.toLowerCase().includes(location.toLowerCase());

      // const matchesPrice = item.price >= minPrice && item.price <= maxPrice;

      // const matchesBedrooms =
      //   bedrooms.length === 0 || bedrooms.includes(itemBedrooms);

      // const matchesBathrooms =
      //   bathrooms.length === 0 || bathrooms.includes(itemBathrooms);

      // const matchesPropertyType =
      //   propertyType.length === 0 || propertyType.includes(itemPropertyType);
  
      // return (
      //   matchesLocation &&
      //   matchesPrice &&
      //   matchesBedrooms &&
      //   matchesBathrooms &&
      //   matchesPropertyType
      // );
    });

    setFilteredData(filtered);
  };



  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setTimeout(applyFilters({newFilters}), 100); // Apply filters after state update
    closeFilter();
  };

  const checkforbed =  data.filter(( item , index) =>  item.description.includes(bed))
  

  return (
    <>
      <View style={{ backgroundColor: "white", alignItems: "center" }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "90%",
            marginHorizontal: 20,
            margin: 20,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../../assets/navigation/back.png")}
            />
          </Pressable>
          <Text style={{ fontWeight: "bold", color: "#1A1E25", fontSize: 19 }}>
            Showing Results
          </Text>
          <Text>
            <Ionicons
              name="filter-outline"
              onPress={openFilter}
              size={23}
              color="black"
            />
          </Text>
        </View>
      </View>

      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <RenderList item={item} navigation={navigation} />
          )}
        />
      ) : (
        <ActivityIndicator size="large" color="#917AFD" />
      )}

      {modalVisible && (
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={closeFilter}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.filterPanel,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <Pressable style={styles.closeButton} onPress={closeFilter}>
              <Ionicons name="close" size={30} color="black" />
            </Pressable>
            <FilterScreen onApplyFilters={handleApplyFilters} />
          </Animated.View>
        </View>
      )}
    </>
  );
};

export default Propertlistings;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  filterPanel: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "white",
    padding: 10,
    zIndex: 1000,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 1001,
  },
});
