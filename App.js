import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Main";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading"; // Optional fallback

const App = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-Semi": require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />; // or a loading spinner
  }

  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};

export default App;
