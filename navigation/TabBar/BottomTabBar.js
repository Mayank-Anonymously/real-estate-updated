import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon, { Icons } from "../TabBar/Icons";
import * as Animatable from "react-native-animatable";
import Colors from "./color";
import Home from "../../assets/tabbaricon/home.png";
import HomeActive from "../../assets/tabbaricon/home-fill.png";
import Explore from "../../assets/tabbaricon/explore.png";
import ExploreActive from "../../assets/tabbaricon/explore-fill.png";
import Profile from "../../assets/tabbaricon/profile.png";
import ProfileActive from "../../assets/tabbaricon/profile-fill.png";

import Subscription from "../../assets/tabbaricon/subscription.png";
import SubscriptionActive from "../../assets/tabbaricon/subscription-fill.png";
const TabArr = [
  {
    route: "Home",
    label: "Home",

    type: Icons.AntDesign,
    icon: "home",
    component: HomeScreen,
    color: Colors.pink,
    alphaClr: Colors.whitesmoke,
  },
  {
    route: "Explore",
    label: "Explore",
    type: Icons.Feather,
    icon: "heart",
    component: ExploreScreen,
    color: Colors.pink,
    alphaClr: Colors.whitesmoke,
  },
  {
    route: "Subscription",
    label: "Subs",
    type: Icons.Feather,
    icon: "clipboard",
    component: SubscriptionScreen,
    color: Colors.pink,
    alphaClr: Colors.whitesmoke,
  },
  {
    route: "Profile",
    label: "Profile",
    type: Icons.AntDesign,
    icon: "user",
    component: ProfileScreen,
    color: Colors.pink,
    alphaClr: Colors.whitesmoke,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = useIsFocused();

  const viewRef = useRef(null);
  const textViewRef = useRef(null);
  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused]);

  // Replace vector icons with images based on the 'focused' state
  const renderImage = (focused) => {
    switch (item.route) {
      case "Home":
        return focused ? (
          <Image
            source={HomeActive}
            style={{ width: 22, height: 22, resizeMode: "contain" }}
          />
        ) : (
          <Image
            source={Home}
            style={{ width: 22, height: 22, resizeMode: "contain" }}
          />
        );
      case "Explore":
        return focused ? (
          <Image
            source={ExploreActive}
            style={{ width: 22, height: 22, resizeMode: "contain" }}
          />
        ) : (
          <Image
            source={Explore}
            style={{ width: 22, height: 22, resizeMode: "contain" }}
          />
        );
      case "Subscription":
        return focused ? (
          <Image
            source={SubscriptionActive}
            style={{ width: 22, height: 22, resizeMode: "contain" }}
          />
        ) : (
          <Image
            source={Subscription}
            style={{ width: 22, height: 22, resizeMode: "contain" }}
          />
        );
      case "Profile":
        return focused ? (
          <Image
            source={ProfileActive}
            style={{ width: 22, height: 22, resizeMode: "contain" }}
          />
        ) : (
          <Image
            source={Profile}
            style={{ width: 22, height: 22, resizeMode: "contain" }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}
    >
      <View>
        <Animatable.View
          ref={viewRef}
          easing={"ease-in-out-cubic"}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "#917AFD", borderRadius: 16 },
          ]}
        />
        <View
          style={[
            styles.btn,
            { backgroundColor: focused ? null : item.alphaClr },
          ]}
        >
          {renderImage(focused)} {/* Render the image based on focus state */}
          <Animatable.View ref={textViewRef} easing={"ease-in-out-cubic"}>
            {focused && (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: Colors.white,
                    paddingHorizontal: 8,
                  }}
                >
                  {item.label}
                </Text>
              </View>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

import { Image, Keyboard } from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  EvilIcons,
} from "react-native-vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import HomeScreen from "../../components/Screens/HomeScreen";
import ExploreScreen from "../../components/Screens/ExploreScreen";
import ProfileScreen from "../../components/Screens/ProfileScreen";
import SubscriptionScreen from "../../components/Screens/SubscriptionScreen";

export default function MyTabs(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerShown: false,

        tabBarStyle: Platform.OS === "ios" ? styles.ios : styles.Android,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 11,
  },
  Android: {
    borderRadius: 5,
    height: 55,
  },
  ios: {
    borderRadius: 5,
  },
});
