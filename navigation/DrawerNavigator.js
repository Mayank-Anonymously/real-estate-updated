import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../components/Screens/ProfileScreen";
import TabNavigator from "./TabNavigator";
import Dashboard from "../components/Screens/Owner/Dashboard";
import TenantFinderScreen from "../components/Screens/Owner/TenantFinder";
import MyTabs from "./TabBar/BottomTabBar";

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="Tabs"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Dasbhoad-Owner" component={Dashboard} />
    <Drawer.Screen name="Tenant-finder" component={TenantFinderScreen} />
  </Drawer.Navigator>
);
export default DrawerNavigator;
