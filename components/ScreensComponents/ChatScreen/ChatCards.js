import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { Avatar, Badge } from "react-native-paper";

const ChatCards = () => {
  const { width, height } = Dimensions.get("screen");
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("LiveChat", {
          name: "K.K Bhusan",
          image: "../../../assets/icon.png",
        })
      }
      style={{ borderBottomWidth: 1, borderBottomColor: "lightgrey" }}
    >
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          margin: 10,
          justifyContent: "center",
          alignItems: "center",
          height: height / 12,
        }}
      >
        <View>
          <Avatar.Image
            size={64}
            source={require("../../../assets/icon.png")}
          />
        </View>
        <View style={{ justifyContent: "space-around", padding: 10 }}>
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 20 }}>Name</Text>
            <Text>12:03</Text>
          </View>
          <View
            style={{
              width: width / 1.5,
              backgroundColor: "white",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "grey" }}>Message</Text>
            <Text>
              <Badge size={24} style={{ padding: 10 }} theme="secondary">
                3
              </Badge>
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatCards;
