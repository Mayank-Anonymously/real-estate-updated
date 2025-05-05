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
    route: "Wishlist",
    label: "Wishlist",
    type: Icons.Feather,
    icon: "heart",
    component: ExploreScreen,
    color: Colors.pink,
    alphaClr: Colors.whitesmoke,
  },
  {
    route: "Orders",
    label: "Orders",
    type: Icons.Feather,
    icon: "clipboard",
    component: ProfileScreen,
    color: Colors.pink,
    alphaClr: Colors.whitesmoke,
  },
  {
    route: "Account",
    label: "Account",
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
  const focused = accessibilityState?.selected ?? false;

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
          <Icon
            type={item.type}
            name={item.icon}
            size={20}
            color={focused ? Colors.white : Colors.dark}
          />
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
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import HomeScreen from "../../components/Screens/HomeScreen";
import ExploreScreen from "../../components/Screens/ExploreScreen";
import ProfileScreen from "../../components/Screens/ProfileScreen";

export default function MyTabs(props) {
  const Width = Dimensions.get("screen").width;
  const navigation = useNavigation();
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
