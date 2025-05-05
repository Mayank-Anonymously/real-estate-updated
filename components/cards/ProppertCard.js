import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import CustomText from "../common/Text";
import { Button } from "react-native-paper";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const PropertyCard = ({
  onPress,
  title,
  location,
  price,
  description,
  image,
}) => {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Hind-Jalandhar": require("../../assets/fonts/Hind/Hind-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  return (
    <>
      <Pressable onPress={onPress}>
        <View style={styles.card}>
          <Image
            source={{
              uri: "https://api.mylavya.com/resources/placeholder.jpeg",
            }}
            style={styles.image}
          />
          <View style={styles.content}>
            <View>
              <View style={styles.ratingRow}></View>
              <CustomText
                style={styles.title}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {title}
              </CustomText>
              <CustomText style={styles.location}>{location}</CustomText>

              <View style={styles.infoRow}>
                <View style={styles.iconText}>
                  <Ionicons name="bed-outline" size={16} color="#888" />
                  <CustomText style={styles.infoText}>{description}</CustomText>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <Button
                  textColor="white"
                  mode="contained"
                  style={{}}
                  buttonColor="#917AFD"
                >
                  Contact
                </Button>
              </View>
              <TouchableOpacity>
                <CustomText style={styles.ratingText}>
                  <FontAwesome name="star" size={14} color="#FFA500" /> 4.8{" "}
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({
  card: {
    shadowOffset: {
      x: 5,
      y: 0,
    },
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    margin: 10,
    elevation: 3,
    width: width / 1.2,
    flexDirection: "row",
    height: height / 4,
    shadowColor: "black",
    shadowOpacity: 2,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: "whitesmoke",
    marginTop: 30,
  },
  image: {
    width: 120,
    height: height / 4,
  },
  content: {
    padding: 14,
    marginTop: 10,
    width: 220,
    justifyContent: "space-between",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,

    fontSize: Platform.OS === "ios" ? 16 : 14,
    color: "#666",
  },
  title: {
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 16 : 13,
    marginBottom: 4,
    color: "#000",
  },
  location: {
    fontSize: Platform.OS === "ios" ? 15 : 13,
    color: "#999",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: Platform.OS === "ios" ? 13 : 12,
    color: "#666",
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 4,
    marginRight: 20,
  },
  price: {
    fontWeight: "bold",

    fontSize: Platform.OS === "ios" ? 18 : 16,
    color: "#000",
  },
  perMonth: {
    fontSize: 12,
    color: "#666",
    marginLeft: 2,
  },
});
