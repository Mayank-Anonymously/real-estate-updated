import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  FlatList,
  Platform,
  Pressable,
  StatusBar,
} from "react-native";
import {
  Ionicons,
  EvilIcons,
  Feather,
  MaterialIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import property_details from "../../utils/properties_detail.json";
import { ActivityIndicator, Avatar } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import CustomText from "../common/Text";
import { fetchpropdetails } from "../../utils/apicalls/fetchbytitle";
import CustomTextBold from "../common/BoldCustomtext";

export default function PropertyDetailScreen() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchpropdetails(setData, id);
    async function loadFonts() {
      await Font.loadAsync({
        "Hind-Jalandhar": require("../../assets/fonts/Hind/Hind-Regular.ttf"),
        "Hind-Jalandhar-Bold": require("../../assets/fonts/Hind/Hind-Bold.ttf"),

        "Hind-Jalandhar": require("../../assets/fonts/Hind/Hind-Light.ttf"),

        "Hind-Jalandhar": require("../../assets/fonts/Hind/Hind-Medium.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const region = {
    latitude: 37.7749, // Example: San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  // var unit = data.unit;
  // var utilities = data.utilities;
  // var parking = data.parkingAndEntry;
  // var nearbyServices = data.nearbyServices;
  // var accessibility = data.accessibility;

  if (data.length === undefined) {
    return (
      <>
        <StatusBar />
        <View style={styles.container} showsVerticalScrollIndicator={false}>
          <View
            style={{
              position: "absolute",
              zIndex: 9999,
              top: 30,
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
            }}
          >
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: "white",
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
              }}
            >
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../../assets/navigation/back.png")}
              />
            </Pressable>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
              }}
            >
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../../assets/navigation/share.png")}
              />
            </View>
          </View>

          <>
            <ScrollView>
              <Image
                source={{
                  uri: "https://api.mylavya.com/resources/placeholder.jpeg",
                }}
                style={styles.image}
              />
              <TouchableOpacity
                style={styles.videoButton}
                onPress={() =>
                  navigation.navigate("Contact_now", {
                    title: data.name,
                    address: data.address,
                  })
                }
              >
                <CustomText style={styles.videoButtonText}>
                  Contact Now
                </CustomText>
              </TouchableOpacity>
              <View style={styles.content}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <CustomTextBold style={styles.title}>
                      {data.title}{" "}
                    </CustomTextBold>
                  </View>
                  <View>
                    <EvilIcons name="heart" size={24} />
                  </View>
                </View>

                <View>
                  <CustomText>{data.address}</CustomText>
                </View>
                <View>
                  <CustomText>{data.description}</CustomText>
                </View>
                <ScrollView horizontal={true}>
                  <View style={{ marginTop: 60 }}>
                    <Text style={{ fontSize: 20 }}>
                      Kitchen & Bath Accessibility
                    </Text>
                    {Object.entries(data.details.table_10).map(
                      ([key, value], index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderWidth: 1,
                            padding: 10,
                            borderColor: "#ddd",
                            marginTop: 10,
                          }}
                        >
                          <Text style={[styles.key, { width: 200 }]}>
                            {key.split(value)[0]}
                          </Text>
                          <Text style={[styles.value, { width: 150 }]}>
                            {value ? value.split(key)[0] : value}
                          </Text>
                        </View>
                      )
                    )}
                  </View>

                  <View style={{ marginTop: 60 }}>
                    <Text style={{ fontSize: 20 }}>Utilities</Text>
                    {Object.entries(data.details.table_7).map(
                      ([key, value], index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderWidth: 1,
                            padding: 10,
                            borderColor: "#ddd",
                            marginTop: 10,
                          }}
                        >
                          <Text style={[styles.key, { width: 200 }]}>
                            {key.split(value)[0]}
                          </Text>
                          <Text style={[styles.value, { width: 150 }]}>
                            {value ? value.split(key)[0] : value}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                  <View style={{ marginTop: 60 }}>
                    <Text style={{ fontSize: 20 }}>Appliances</Text>
                    {Object.entries(data.details.table_6).map(
                      ([key, value], index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderWidth: 1,
                            padding: 10,
                            borderColor: "#ddd",
                            marginTop: 10,
                          }}
                        >
                          <Text style={[styles.key, { width: 200 }]}>
                            {key.split(value)[0]}
                          </Text>
                          <Text style={[styles.value, { width: 150 }]}>
                            {value ? value.split(key)[0] : value}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                </ScrollView>

                {/* <View
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                  }}
                >
                  <View>
                    <View style={{ flexDirection: "row", margin: 10 }}>
                      <Image
                        source={require("../../assets/images/detail/star.png")}
                        style={{ width: 25, height: 25, marginRight: 10 }}
                        resizeMode="contain"
                      />
                      <CustomText style={{ color: "#7D7F88" }}>
                        {" "}
                        4.1 (66 reviews)
                      </CustomText>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        margin: 10,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={require("../../assets/images/detail/bed.png")}
                        style={{ width: 25, height: 25, marginRight: 10 }}
                        resizeMode="contain"
                      />
                      <CustomText style={{ color: "#7D7F88" }}>
                        {unit.bedrooms} room{" "}
                      </CustomText>
                    </View>
                  </View>
                  <View>
                    <View style={{ flexDirection: "row", margin: 10 }}>
                      <Image
                        source={require("../../assets/images/detail/location.png")}
                        style={{ width: 25, height: 25, marginRight: 10 }}
                        resizeMode="contain"
                      />
                      <CustomText numberOfLines={3}>{data.address}</CustomText>
                    </View>
                    {unit.sizeSqFt && (
                      <View style={{ flexDirection: "row", margin: 10 }}>
                        <Image
                          source={require("../../assets/images/detail/sq.png")}
                          style={{ width: 25, height: 25 }}
                          resizeMode="contain"
                        />
                        <CustomText style={{ color: "#7D7F88" }}>
                          {unit.sizeSqFt} sqft
                        </CustomText>
                      </View>
                    )}
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: "#D6D6D6",
                    width: "100%",
                    height: 1,
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                />

                <View style={styles.ownerInfo}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../../assets/avatars/female.png")}
                      style={styles.ownerAvatar}
                    />
                    <View>
                      <CustomText style={styles.ownerName}>
                        {data.contact.name}
                      </CustomText>
                      <CustomText style={styles.ownerRole}>
                        {data.contact.role}
                      </CustomText>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      shadowColor: "#eeeff0",
                      shadowRadius: 5,
                      elevation: 10,
                      padding: 10,
                      shadowOpacity: 1,
                      backgroundColor: "white",
                      borderRadius: 10,
                      shadowOffset: {
                        x: 10,
                        y: 5,
                      },
                    }}
                  >
                    <Feather name="phone-call" size={20} color="#7D7F88" />
                  </View>
                </View>

                <View style={styles.section}>
                  <CustomText style={styles.sectionTitle}>
                    Home facilities
                  </CustomText>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <MaterialIcons
                      name="severe-cold"
                      size={25}
                      color="#7D7F88"
                      style={{ marginRight: 10 }}
                    />
                    <CustomText
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#7D7F88",
                      }}
                    >
                      {" "}
                      Air conditioner - {utilities?.airConditioner}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <FontAwesome6
                      name="kitchen-set"
                      size={21}
                      color="#7D7F88"
                      style={{ marginRight: 10 }}
                    />
                    <CustomText
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#7D7F88",
                      }}
                    >
                      {" "}
                      Kicthen -{" "}
                      {accessibility?.kitchen.type
                        ? accessibility.kitchen.type
                        : accessibility.kitchen}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <FontAwesome6
                      name="car"
                      size={20}
                      style={{ marginRight: 10 }}
                      color="#7D7F88"
                    />
                    <CustomText
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#7D7F88",
                      }}
                    >
                      {" "}
                      Parking -{" "}
                      {parking?.allottedParkingSpaces
                        ? parking?.allottedParkingSpaces
                        : "No Parking Space"}
                    </CustomText>
                  </View>
                 
                </View> */}

                {/* <View style={styles.section}>
                  <CustomText style={styles.sectionTitle}>
                    Nearest public facilities
                  </CustomText>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      aligItems: "center",
                    }}
                  >
                    <View>
                      <View
                        style={{
                          backgroundColor: "white",
                          margin: 10,
                          borderRadius: 10,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Feather
                            name="shopping-cart"
                            size={20}
                            color="#7D7F88"
                          />
                          <CustomText
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              marginLeft: 10,
                              color: "#7D7F88",
                            }}
                          >
                            Minimarket{" "}
                          </CustomText>
                        </View>
                        <CustomText style={styles.facility}>
                          {nearbyServices?.groceryShopping}
                        </CustomText>
                      </View>
                      <View
                        style={{
                          backgroundColor: "white",
                          margin: 10,
                          borderRadius: 10,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={{
                              flexDirection: "row",
                              marginRight: 10,
                            }}
                          >
                            <FontAwesome6
                              name="hospital"
                              size={20}
                              color="#7D7F88"
                            />
                          </View>
                          <CustomText
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: "#7D7F88",
                            }}
                          >
                            Hospital
                          </CustomText>
                        </View>
                        <CustomText style={styles.facility}>
                          {nearbyServices?.hospital}
                        </CustomText>
                      </View>
                    </View>
                    <View>
                      <View
                        style={{
                          backgroundColor: "white",
                          margin: 10,
                          borderRadius: 10,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Feather
                            name="shopping-cart"
                            size={20}
                            color="#7D7F88"
                          />
                          <CustomText
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              marginLeft: 10,
                              color: "#7D7F88",
                            }}
                          >
                            Bus Stop{" "}
                          </CustomText>
                        </View>
                        <CustomText style={styles.facility}>
                          {nearbyServices?.busStop}
                        </CustomText>
                      </View>
                      <View
                        style={{
                          backgroundColor: "white",
                          margin: 10,
                          borderRadius: 10,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={{
                              flexDirection: "row",
                              marginRight: 10,
                            }}
                          >
                            <FontAwesome6
                              name="hospital"
                              size={20}
                              color="#7D7F88"
                            />
                          </View>
                          <CustomText
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: "#7D7F88",
                            }}
                          >
                            Bus Stop
                          </CustomText>
                        </View>
                        <CustomText style={styles.facility}>
                          {nearbyServices?.busStop}
                        </CustomText>
                      </View>
                    </View>
                  </View>
                </View> */}

                {/* <View style={styles.section}>
                  <CustomText style={styles.sectionTitle}>
                    Property Comments
                  </CustomText>
                  <CustomText style={styles.paragraph}>
                    {data.propertyComments}
                  </CustomText>

                  <CustomText style={styles.paragraph}>
                    This apartment equipped with Washing Machine,
                  </CustomText>
                  <CustomText style={styles.paragraph}>
                    Electric,Stove, Microwave, Refrigerator, Cutlery.
                  </CustomText>
                </View> */}
                <View style={styles.section}>
                  <CustomText style={styles.sectionTitle}>Location</CustomText>
                  <MapView style={styles.map} initialRegion={region} />
                </View>

                {/* <TouchableOpacity style={styles.advanceButton}>
                      <CustomText style={styles.advanceText}>
                        Advance Payment
                      </CustomText>
                      <CustomText style={styles.advanceAmount}>
                        500$/month
                      </CustomText>
                    </TouchableOpacity> */}

                <View style={styles.section}>
                  <CustomText style={styles.sectionTitle}>
                    Testimonials
                  </CustomText>
                  <View style={styles.testimonial}>
                    <Avatar.Image
                      size={44}
                      source={require("../../assets/avatars/male.png")}
                    />
                    <CustomText style={styles.testimonialName}>
                      Biggy Shahi ⭐⭐⭐⭐⭐
                    </CustomText>
                    <CustomText style={styles.paragraph}>
                      My wife and I had a dream of downsizing from our house in
                      Cape Elizabeth into a small condo closer to where we work
                      and play in Portland...
                    </CustomText>
                  </View>
                  <View style={styles.testimonial}>
                    <Avatar.Image
                      size={44}
                      source={require("../../assets/avatars/male.png")}
                    />
                    <CustomText style={styles.testimonialName}>
                      C. J. Upohrel ⭐⭐⭐⭐⭐
                    </CustomText>
                    <CustomText style={styles.paragraph}>
                      My wife & I have moved 6 times in the last 25 years.
                      Obviously, we’ve dealt with many realtors both on the
                      buying and selling side...
                    </CustomText>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.footerFixed}>
              <View>
                <CustomText style={styles.footerPrice}>
                  {data.price} / month
                </CustomText>
                <CustomText style={styles.footerEstimation}>
                  Payment estimation
                </CustomText>
              </View>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={() =>
                  navigation.navigate("Contact_now", {
                    title: data.name,
                    address: data.address,
                  })
                }
              >
                <CustomText style={styles.contactText}>Contact</CustomText>
              </TouchableOpacity>
            </View>
          </>
        </View>
        {/* Footer fixed at the bottom */}
      </>
    );
  } else {
    return (
      <><ActivityIndicator size="small" color="#917AFD" />
      </>)
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 300 },
  videoButton: {
    borderWidth: 1,
    borderColor: "#5B4FE0",
    margin: 16,
    padding: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  videoButtonText: {
    color: "#5B4FE0",
    fontWeight: "500",
  },
  content: { paddingHorizontal: 16, marginBottom: 50 },
  title: {
    fontSize: 18,
    color: "#1F1D5B",
    marginBottom: 4,
  },
  subtitle: { color: "#555", marginBottom: 2 },
  location: { color: "#555", marginBottom: 12 },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 16,
  },
  ownerAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  ownerName: { fontWeight: "bold", color: "#1F1D5B" },
  ownerRole: { fontSize: 12, color: "#888" },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    marginBottom: 8,
    marginTop: 10,
    fontFamily: "Hind-Jalandhar-Bold",
  },
  facility: { fontSize: 14, marginVertical: 2, color: "#333" },
  map: { width: "100%", height: 150, borderRadius: 8, marginVertical: 12 },
  paragraph: { color: "#444", fontSize: 14, marginBottom: 8 },
  advanceButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#5B4FE0",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  advanceText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  advanceAmount: { color: "#fff", fontWeight: "600", fontSize: 16 },
  testimonial: { marginBottom: 12 },
  testimonialName: { fontWeight: "bold", marginBottom: 4, color: "#1F1D5B" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "#eee",
    borderTopWidth: 1,
    paddingTop: 16,
    paddingBottom: 32,
  },
  footerPrice: { fontSize: 18, fontWeight: "bold", color: "#1F1D5B" },
  footerEstimation: { fontSize: 12, color: "#888" },
  contactButton: {
    backgroundColor: "#5B4FE0",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  contactText: { color: "#fff", fontWeight: "600" },
  footerFixed: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});
