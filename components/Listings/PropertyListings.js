import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  Pressable,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import PropertyCard from "../cards/ProppertCard";
import states from "../../utils/County.json";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fetchallcounty } from "../../utils/apicalls/fetchallcounty";
import FilterScreen from "../Screens/FilterScreen";
import { fetchallcity } from "../../utils/apicalls/fetchall";
const RenderList = ({ item }) => {
  const navigation = useNavigation();

  return (
    <PropertyCard
      onPress={() =>
        navigation.navigate("PropertyDetail", {
         id : item._id,
        })
      }
      title={item.title}
      location={item.address}
      price={item.price}
      description={item.description}
      image={item.image}
    />
  );
};

const Propertlistings = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    fetchallcity(setData);
  }, []);

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
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          >
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
            onPress={() => setModalVisible(!modalVisible)}
            size={23}
            color="black"
            />
        </Text>
      </View>
      
      </View>    {modalVisible && <FilterScreen />}
    {
      data.length >  0 ? 
      <FlatList
        data={data}
        renderItem={({ item }) => <RenderList item={item} />}
      />
      : <ActivityIndicator size="large" color="#917AFD"/> 
    }

</>
  );
};

export default Propertlistings;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
