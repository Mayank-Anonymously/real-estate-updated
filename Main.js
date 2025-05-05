"use client";
import React, { useEffect } from "react";
import RootStackNavigator from "./navigation/AuthNavigation/NonAuthenticatedNavigation";

import { SafeAreaView } from "react-native-safe-area-context";
import { View , StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthRootStackNavigator from "./navigation/AuthNavigation/AuthenticatedNavigation";

const Main = () => {
  const checking = async () => {
    const isAuthenticated = AsyncStorage.getItem("isAuthenticated");
    return true;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
    
      {checking() === "true" ? (
        <AuthRootStackNavigator />
      ) : (
        <RootStackNavigator />
      )}
    </View>
  );
};

export default Main;
