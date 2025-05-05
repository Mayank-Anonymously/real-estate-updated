import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import PropertyCard from "../../cards/ProppertCard";
import { ScrollView } from "react-native";
import { Button, Paragraph } from "react-native-paper";
import InternationalMigrations from "../../cards/DestinationCards";
import states from "../../../utils/County.json";
import { useNavigation } from "@react-navigation/native";
const height = Dimensions.get("window").height;
const NeedToList = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ backgroundColor: "white", marginRight: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 40 }}>
          Near your location
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Paragraph style={{ color: "grey" }}>
            Properties in Hopewell Township
          </Paragraph>
          <Button
            style={{ width: 50, height: 40 }}
            labelStyle={{ fontSize: 12 }}
            mode="text"
            onPress={() => navigation.navigate("Explore")}
          >
            See all
          </Button>
        </View>
        <View>
          <ScrollView horizontal={true}>
            {states
              .filter((ite) => ite.address.includes("Hopewell Township"))
              .map((item, index) => {
                return (
                  <PropertyCard
                    onPress={() =>
                      navigation.navigate("PropertyDetail", {
                        title: item.title,
                        rent: item.price,
                        image: item.image,
                      })
                    }
                    title={item.title}
                    location={item.address}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                );
              })}
          </ScrollView>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Top Rated</Text>
            <Button
              style={{ width: 50, height: 40 }}
              labelStyle={{ fontSize: 12 }}
              mode="text"
            >
              See all
            </Button>
          </View>
          <ScrollView horizontal={true}>
            {states
              .filter((ite) => ite.address.includes("Haddonfield"))
              .map((item, index) => {
                return (
                  <PropertyCard
                    onPress={() =>
                      navigation.navigate("PropertyDetail", {
                        title: item.title,
                        rent: item.price,
                        image: item.image,
                      })
                    }
                    title={item.title}
                    location={item.address}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                );
              })}
          </ScrollView>
        </View>
        <InternationalMigrations />
      </View>
    </ScrollView>
  );
};

export default NeedToList;

const styles = StyleSheet.create({});
