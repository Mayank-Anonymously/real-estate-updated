import React, { useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Animated, View, Dimensions, Image } from "react-native";
import StackNavigator from "./StackNavigator";
import ProfileScreen from "../components/Screens/ProfileScreen";
import ExploreScreen from "../components/Screens/ExploreScreen";

// Icons
import Home from "../assets/tabbaricon/home.png";
import HomeActive from "../assets/tabbaricon/home-fill.png";
import Explore from "../assets/tabbaricon/explore.png";
import ExploreActive from "../assets/tabbaricon/explore-fill.png";
import Profile from "../assets/tabbaricon/profile.png";
import ProfileActive from "../assets/tabbaricon/profile-fill.png";
import Subscription from "../assets/tabbaricon/subscription.png";
import SubscriptionActive from "../assets/tabbaricon/subscription-fill.png";
import { useNavigationState, useRoute } from "@react-navigation/native";
import SubscriptionScreen from "../components/Screens/SubscriptionScreen";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

const TabNavigator = () => {
  const tabWidth = width / 4;
  const INDICATOR_WIDTH = 20; // <- fixed width of indicator
  const translateX = useRef(new Animated.Value(0)).current;

  const moveIndicator = (index) => {
    const idx = index ? index : 0;
    const offset = idx * tabWidth + tabWidth / 2 - INDICATOR_WIDTH / 2;
    Animated.spring(translateX, {
      toValue: offset,
      useNativeDriver: true,
    }).start();
  };

  // ✅ Hook to monitor current tab index and update indicator
  const routeNameRef = useRef();
  const navigationState = useNavigationState((state) => state);
  useEffect(() => {
    const index = navigationState?.index ?? 0;
    moveIndicator(index);
  }, [navigationState?.index]);

  return (
    <View style={{ flex: 1 }}>
      {/* Indicator above tab bar */}
      <View style={styles.indicatorWrapper}>
        <Animated.View
          style={[
            styles.indicator,
            {
              width: INDICATOR_WIDTH,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#6246ea",
          tabBarInactiveTintColor: "black",
          tabBarStyle: {
            height: 60,
            backgroundColor: "white",
            borderTopWidth: 0,
            elevation: 10,
            position: "relative",
          },
          tabBarIcon: ({ focused }) => {
            let iconName;

            switch (route.name) {
              case "Home":
                iconName = focused ? HomeActive : Home;
                break;
              case "Explore":
                iconName = focused ? ExploreActive : Explore;
                break;
              case "Profile":
                iconName = focused ? ProfileActive : Profile;
                break;
              case "Subscriptions":
                iconName = focused ? SubscriptionActive : Subscription;
                break;
            }

            return (
              <Image
                source={iconName}
                style={{ width: 22, height: 22, resizeMode: "contain" }}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={StackNavigator}
          listeners={{
            tabPress: () => moveIndicator(0),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          listeners={{
            tabPress: () => moveIndicator(1),
          }}
        />

        <Tab.Screen
          name="Subscriptions"
          component={SubscriptionScreen}
          listeners={{
            tabPress: () => moveIndicator(2),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          listeners={{
            tabPress: () => moveIndicator(3),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  indicatorWrapper: {
    position: "absolute",
    bottom: 60, // Just above the tab bar
    width: "100%",
    height: 4,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  indicator: {
    height: 3,
    backgroundColor: "#6246ea",
    borderRadius: 2,
  },
});
