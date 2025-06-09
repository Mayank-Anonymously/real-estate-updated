"use client";
import React, { useEffect } from "react";
import RootStackNavigator from "./navigation/AuthNavigation/NonAuthenticatedNavigation";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthRootStackNavigator from "./navigation/AuthNavigation/AuthenticatedNavigation";
import { useSelector } from "react-redux";

const Main = () => {
  const user = useSelector((state) => state.user.loggedIn);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {user === true ? <AuthRootStackNavigator /> : <RootStackNavigator />}
    </View>
  );
};

export default Main;
