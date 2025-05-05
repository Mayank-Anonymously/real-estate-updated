import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../components/Screens/HomeScreen";
import DetailsScreen from "../components/Screens/DetailsScreen";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);
export default StackNavigator;
