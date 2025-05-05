import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo } from "react-native-vector-icons";

import { Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "../common/Text";
import { fetchSearchProperties } from "../../utils/apicalls/searchquery";
import { useNavigation, useRoute } from "@react-navigation/native";

const SeacrResults = () => {
  const slideAnim = useRef(new Animated.Value(-100)).current; // starts off-screen
  const route = useRoute();
  const { query } = route.params;
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    fetchSearchProperties(query, setData);
  }, []);

  const Item = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PropertyDetail", {
            id: item._id,
          })
        }
      >
        <View
          style={{
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            flexDirection: "row",
          }}
        >
          <Entypo name="location" />
          <Text style={{ marginLeft: 10 }}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}></View>
      <FlatList data={data} renderItem={({ item }) => <Item item={item} />} />
    </View>
  );
};

export default SeacrResults;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    elevation: 5,
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  inputStyle: {
    fontSize: 13,
    padding: -10,
  },
  vector: {
    position: "absolute",
    left: "13%",
    right: "13.04%",
    top: "7.29%",
    bottom: "7.29%",
    borderRadius: 12, // optional for smoothness
  },
});
