import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigationState } from "@react-navigation/native";
import { View, Text, Platform } from "react-native";
import AvailableforRent from "../components/Screens/HomeScreenComp/AvailableforRent";
import NeedToList from "../components/Screens/HomeScreenComp/NeedToList";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const TabTop = createMaterialTopTabNavigator();
const { width } = Dimensions.get("window");

const TopTabs = () => {
  return (
    <TabTop.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarItemStyle: {
          width: Platform.OS === "ios" ? width / 2.5 : width / 2.6,
          padding: Platform.OS === "ios" ? 5 : 5,
        },
        tabBarIndicatorStyle: {
          height: "50%",
          borderRadius: 50,
          backgroundColor: "transparent",
        },
        tabBarStyle: {
          backgroundColor: "#f4f4f4",
          borderRadius: 30,
          marginHorizontal: 20,
          marginTop: 10,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          overflow: "hidden",
          margin: 10,
          width: width / 1.2,
        },
        tabBarLabel: ({ focused }) => (
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
              overflow: "hidden",
              width: "100%",
              backgroundColor: focused ? undefined : "transparent",
            }}
          >
            {focused && (
              <LinearGradient
                colors={["#5B38F6", "#6E72FC"]}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  borderRadius: 25,
                }}
              />
            )}
            <Text
              style={{
                color: focused ? "#fff" : "#999",
                fontWeight: "600",
                padding: Platform.OS === "ios" ? 17 : 15,
                fontSize: 13,
              }}
            >
              {route.name}
            </Text>
          </View>
        ),
      })}
    >
      <TabTop.Screen name="I need to rent" component={AvailableforRent} />
      <TabTop.Screen name="I want to list" component={NeedToList} />
    </TabTop.Navigator>
  );
};

export default TopTabs;
