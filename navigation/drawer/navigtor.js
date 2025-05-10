import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "../TabBar/BottomTabBar";

import CustomDrawer from "./custom";

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
    }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen
      name="Tabs"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
  </Drawer.Navigator>
);
export default DrawerNavigator;
